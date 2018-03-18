// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as core from '../../common/core'
import * as stores from '../../common/stores'

import fastify from '../fastify'
import * as boom from 'boom'
import * as got from 'got'
import * as redis from '../adapters/redis'



fastify.route({
	method: 'POST',
	url: '/api/search',
	schema: {
		body: {
			type: 'object',
			properties: { query: { type: 'string' }, },
			required: ['query'],
		},
	},
	handler: async function(request, reply) {
		let query = core.string.clean(request.body.query)
		// console.log('search query >', JSON.stringify(query, null, 4))
		let results = await stores.search(query)
		// console.log('results.length >', results.length)
		return results
	},
})


