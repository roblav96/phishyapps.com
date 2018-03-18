// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import _ from 'lodash'
import * as http from '@/client/adapters/http'



@Vts.Component
export default class extends Vue {

	focused = false
	busy = false
	search = ''
	results = []



	oninput = _.debounce(this.syncResults, 300)
	syncResults(query: string) {
		if (!query) return this.results.splice(0);
		this.busy = true
		http.post('/search', { query }).then((response: Stores.SearchResult[]) => {
			console.log('response >', response)
		}).catch(error => error).finally(() => {
			this.busy = false
		})
	}

	onselect(selected) {

	}



}


