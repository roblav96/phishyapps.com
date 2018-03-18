// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as appstore from 'app-store-scraper'
import * as playstore from 'google-play-scraper'



export function search(query: string) {
	return Promise.all([
		appstore.search({ term: query }).catch(e => { console.error('search appstore Error >', e); return [] }),
		playstore.search({ term: query, fullDetail: false }).catch(e => { console.error('search playstore Error >', e); return [] }),
	]).then(function(resolved: any[][]) {
		resolved[0].forEach(function(aresult: Stores.SearchResult) {
			aresult.appstore = true
		})
		resolved[1].forEach(function(presult: Stores.SearchResult) {
			presult.playstore = true
			if (presult.icon) presult.icon = 'https:' + presult.icon;
		})
		return _.flatten(resolved) as Stores.SearchResult[]
	})
}





declare global {
	namespace Stores {
		type SearchResult = appstore.SearchResult & playstore.SearchResult & {
			appstore: boolean
			playstore: boolean
		}
	}
}



// ████  app-store-scraper fixes  ████
// node_modules/app-store-scraper/lib/search.js :32
// .then((response) => !!response.bubbles[0] ? response.bubbles[0].results : [])

// ████  google-play-scraper fixes  ████
// node_modules/google-play-scraper/lib/app.js :47
// if (!detailsInfo.html()) return {};


