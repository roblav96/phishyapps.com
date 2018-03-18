// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as common from '../common'
import * as utils from './services/utils'

import * as http from 'http'
import * as Fastify from 'fastify'
import * as pino from 'pino'
import * as cors from 'cors'
import * as boom from 'boom'
import * as cookie from 'cookie'
import * as security from './services/security'
import * as redis from './adapters/redis'



const fastify = Fastify<http.Server, http.IncomingMessage, http.ServerResponse>({
	// logger: { level: 'info', prettyPrint: { forceColor: true, levelFirst: true, }, },
})
export default fastify

fastify.register(require('fastify-cookie'), error => { if (error) console.error('fastify-cookie Error >', error); })



fastify.setNotFoundHandler(async function(request, reply) {
	return boom.notFound()
})

fastify.setErrorHandler(async function(error: boom & { validation: any }, request, reply) {
	console.error('fastify setErrorHandler Error >', error)
	if (Array.isArray(error.validation)) {
		let validation = error.validation[0]
		error = boom.preconditionFailed('Parameter `' + validation.dataPath.substr(1) + '` ' + validation.message) as any
	} else if (!error.isBoom) {
		// console.error('setErrorHandler >', error)
		error = boom.internal(error.message) as any
	}
	reply.code(error.output.statusCode)
	reply.headers(error.output.headers)
	reply.type('application/json')
	return error.output.payload
})



fastify.use(cors({ origin: process.DOMAIN }))

fastify.addHook('preHandler', security.preHandler)



import './api/security.api'
import './api/recaptcha.api'
import './api/search.api'



// console.log('\nprocess.PORT >', process.PORT, '\nprocess.HOST >', process.HOST)
fastify.listen(process.PORT, process.HOST, function(error) {
	if (error) return console.error('fastify listen Error >', error);
	console.info('fastify.listen >', fastify.server.address().address + ':' + fastify.server.address().port)
})





declare global {
	type FastifyMiddleware = Fastify.FastifyMiddleware<http.Server, http.IncomingMessage, http.ServerResponse>
	type FastifyRequest = Fastify.FastifyRequest<http.IncomingMessage>
	type FastifyReply = Fastify.FastifyReply<http.ServerResponse>
}

declare module 'fastify' {
	interface FastifyRequest<HttpRequest> {
		cookies: Dict<string>
		authed: boolean
		ip: string
		hostname: string
		doc: Partial<Security.Doc>
	}
	interface FastifyReply<HttpResponse> {
		setCookie: (name: string, value: string, opts: cookie.CookieSerializeOptions) => FastifyReply<HttpResponse>
	}
}


