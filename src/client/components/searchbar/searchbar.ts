// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import _ from 'lodash'
import fuzzy from 'fuzzy'
import * as core from '@/common/core'
import * as http from '@/client/adapters/http'



@Vts.Component
export default class extends Vue {

	mounted() {
		setTimeout(() => {
			this.query = 'poloniex'
		}, 300)
	}

	busy = false
	query = ''
	results = []

	v_icon(result: Stores.SearchResult) {
		return result.appstore ? 'apple' : 'android'
	}
	v_title(title: string) {
		return _.truncate(title, { length: 64 })
	}
	v_desc(result: Stores.SearchResult) {
		let desc = result.appstore ? result.description : result.summary
		return _.truncate(desc, { length: 128 })
	}

	oninput = _.debounce(this.syncResults, 300)
	syncResults(query: string) {
		if (!query) return this.results.splice(0);
		this.busy = true
		http.post('/search', { query }).then((results: Stores.SearchResult[]) => {
			// console.log('results >', core.object.clone(results))
			this.results = results

		}).catch(error => {
			console.error('syncResults Error >', error)
		}).finally(() => {
			this.busy = false
		})
	}

	onselect(result: Stores.SearchResult) {
		console.log('result >', JSON.stringify(result, null, 4))
	}



}


