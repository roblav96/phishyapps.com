// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import _ from 'lodash'
import * as core from '@/common/core'
import * as http from '@/client/adapters/http'
import VUtils from '@/client/mixins/v-utils'



@Vts.Component
export default class extends Mixins(VUtils) {

	mounted() {
		{ (this.$refs['search_input'] as HTMLInputElement).focus() }
		if (DEVELOPMENT) setTimeout(() => this.query = 'poloniex', 100);
	}

	busy = false
	query = ''
	results = []

	oninput = _.debounce(this.syncQuery, 500)
	syncQuery(query: string) {
		if (!query) return this.results.splice(0);
		this.busy = true
		http.post('/search', { query }).then((response: Stores.SearchResult[]) => {
			// console.log('response >', core.object.clone(response))
			response.forEach(v => v.description = _.truncate(v.description || v.summary, { length: 128 }))
			this.results = response
		}).catch(error => {
			console.error('syncQuery Error >', error)
		}).finally(() => {
			this.busy = false
		})
	}

}


