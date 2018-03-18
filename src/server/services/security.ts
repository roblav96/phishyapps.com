// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as common from '../../common'

import fastify from '../fastify'
import * as forge from 'node-forge'
import * as boom from 'boom'
import * as redis from '../adapters/redis'



export async function preHandler(request: FastifyRequest, reply: FastifyReply) {
	request.authed = false

	// let invalid = common.valid.headers(request.headers, ['x-uuid', 'x-finger', 'user-agent', 'hostname'])
	// if (invalid) throw boom.preconditionFailed('Invalid ' + invalid + ' header, pre-handler hook');

	request.ip = reqip(request)
	request.hostname = request.headers['hostname']
	request.doc = {
		uuid: request.headers['x-uuid'],
		finger: request.headers['x-finger'],
		ua: request.headers['user-agent'],
	}

	if (request.headers['x-id']) request.doc.id = request.headers['x-id'];
	if (request.headers['x-token']) {
		let split = request.headers['x-token'].split('.')
		if (split.length != 2) {
			throw boom.preconditionFailed('Invalid x-token header, split.length != 2')
		}
		request.doc.token = split[0]
		let stamp = Number.parseInt(split[1])
		let now = Date.now()
		if (!_.inRange(stamp, now - 5000, now + 5000)) {
			throw boom.preconditionFailed('Expired x-token header')
		}
	}

	if (request.cookies['x-bytes']) {
		request.doc.bytes = request.cookies['x-bytes']
	}

	if (request.doc.bytes && request.doc.token) {
		let prime = await redis.main.hget('security:doc:' + request.doc.uuid, 'prime')
		if (prime) {
			let hmac = docHmac(request.doc.uuid, request.doc.bytes, request.hostname, prime)
			request.authed = request.doc.token == hmac
		}
	}

}



// export function docHmac(doc: Partial<Security.Doc>, prime: string) {
// let message = doc.uuid + doc.bytes
export function docHmac(uuid: string, bytes: string, hostname: string, prime: string) {
	// console.log('docHmac', 'uuid', uuid, 'bytes', bytes, 'hostname', hostname, 'prime', prime)
	return common.security.hmac(uuid + bytes + hostname, prime)
}



export function reqip(request: FastifyRequest) {
	if (request.headers['x-forwarded-for']) return request.headers['x-forwarded-for'];
	if (request.headers['x-real-ip']) return request.headers['x-real-ip'];
	if (request.req.connection.remoteAddress) return request.req.connection.remoteAddress;
	if (request.req.socket.remoteAddress) return request.req.socket.remoteAddress;
	return null
}





declare global {
	namespace Security {
		interface Doc {
			id: string
			uuid: string
			finger: string
			ua: string
			bytes: string
			prime: string
			token: string
			drift: number
		}
	}
}


