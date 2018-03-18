// 

import * as _ from 'lodash'
import * as common from '@/common'
import got from 'got'
import vm from '@/client/vm'



declare global {
	namespace Http {
		interface RequestConfig extends got.GotJSONOptions {
			url: string
			query: any
			silent: boolean
			isproxy: boolean
		}
	}
}

function request(config: Partial<Http.RequestConfig>): Promise<any> {
	return Promise.resolve().then(function() {

		config.json = true
		let pconfig = config.isproxy ? common.object.clone(config) : undefined

		if (!Number.isFinite(config.timeout as any)) config.timeout = 10000;
		if (!Number.isFinite(config.retries as any)) config.retries = 5;

		config.silent = config.silent || PRODUCTION
		if (!config.silent) console.log('%c▶ ' + config.method + ' ' + config.url + ' ▶', 'font-weight: 300;', (JSON.stringify(config.query || config.body || {})).substring(0, 64));

		if (config.url[0] == '/') config.url = process.DOMAIN + '/api' + config.url;

		if (!config.headers) config.headers = {};
		Object.assign(config.headers, {
			'x-version': process.VERSION,
			'x-platform': 'web',
			'x-silent': config.silent,
		})
		common.object.compact(config.headers)

		if (config.isproxy) {
			config.url = process.DOMAIN + '/api/proxy'
			config.body = pconfig
			config.method = 'POST'
		}

		return got(config.url, config as any).then(({ body }) => body)

	}).catch(function(error: got.GotError) {
		let message = _.get(error, 'statusMessage', error.message)

		if (_.has(error, 'response.body.message') && error.response.body.message != message) {
			message += `: "${error.response.body.message}"`
		}

		let method = _.get(error, 'method', config.method)
		let url = _.get(error, 'url', config.url).replace(process.DOMAIN, '')
		let route = '[' + method + '] ' + url
		console.log('%c◀ ' + route, 'color: red; font-weight: bolder;', message)
		vm.$toast.open({ message: route + ' ▶ ' + message, type: 'is-danger' })

		error.message = message
		return Promise.reject(error)
	})

}

export function get<Q = any, T = any>(url: string, query?: Q, config = {} as Partial<Http.RequestConfig>): Promise<T> {
	config.url = url
	config.method = 'GET'
	if (query) config.query = query;
	return request(config)
}

export function post<B = any, T = any>(url: string, body?: B, config = {} as Partial<Http.RequestConfig>): Promise<T> {
	config.url = url
	config.method = 'POST'
	if (body) config.body = body as any;
	return request(config)
}


