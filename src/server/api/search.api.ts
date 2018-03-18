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
			properties: {
				query: { type: 'string' },
			},
			required: ['query'],
		},
	},
	handler: async function(request, reply) {
		let query = common.string.clean(request.body.query)
		console.log('search query >', JSON.stringify(query, null, 4))
		let results = await stores.search(query)
		console.log('results.length >', results.length)
		return results
	},
})


