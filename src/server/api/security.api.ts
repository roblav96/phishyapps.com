// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as common from '../../common'

import fastify from '../fastify'
import * as security from '../services/security'
import * as got from 'got'
import * as forge from 'node-forge'
import * as redis from '../adapters/redis'



fastify.route({
	method: 'GET',
	url: '/api/security/token',
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					token: { type: 'string' },
				},
			},
		},
	},
	handler: async function(request, reply) {
		let prime = common.security.random(32)
		await redis.main.hset('security:doc:' + request.doc.uuid, 'prime', prime)
		// await redis.pipeline()
		// 	.hset('security:doc:' + request.doc.uuid, 'prime', prime)
		// 	.exec().then(redis.fixpipeline)

		let bytes = common.security.random(32)
		reply.setCookie('x-bytes', bytes, {
			domain: process.DOMAIN, path: '/',
			sameSite: true, httpOnly: true, secure: PRODUCTION,
		})

		let hmac = security.docHmac(request.doc.uuid, bytes, request.hostname, prime)
		return { token: hmac }

	},
})


