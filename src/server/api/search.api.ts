// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as common from '../../common'

import fastify from '../fastify'
import * as boom from 'boom'
import * as got from 'got'
import * as redis from '../adapters/redis'
import * as stores from '../adapters/stores'



fastify.route({
	method: 'POST',
	url: '/api/search',
	schema: {
		body: {
			type: 'object',
			required: ['query'],
			properties: {
				query: { type: 'string' },
			},
		},
		response: {
			200: {
				type: 'object',
				required: ['results'],
				properties: {
					results: { type: 'array' },
				},
			},
		},
	},
	handler: async function(request, reply) {
		let query = common.string.clean(request.body.query)
		console.log('search query >', JSON.stringify(query, null, 4))
		let results = await stores.search(query)
		return { results }
	},
})


