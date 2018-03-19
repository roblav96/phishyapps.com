// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import _ from 'lodash'
import fuzzy from 'fuzzy'
import * as core from '@/common/core'
import * as http from '@/client/adapters/http'
import VUtils from '@/client/mixins/v-utils'



@Vts.Component
export default class extends Mixins(VUtils) {

	mounted() {
		// if (DEVELOPMENT) setTimeout(() => this.query = 'poloniex', 300);
	}

	busy = false
	query = ''
	results = []

	v_desc(result: Stores.SearchResult) {
		let desc = result.apple ? result.description : result.summary
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
		// console.log('result >', JSON.stringify(result, null, 4))
	}



}


