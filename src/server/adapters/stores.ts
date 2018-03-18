// 

import * as eyes from 'eyes'
import * as _ from 'lodash'
import * as common from '../../common'
import * as appstore from 'app-store-scraper'
import * as playstore from 'google-play-scraper'
import * as got from 'got'



export async function search(term: string) {
	return _.flatten<any>(await Promise.all([
		appstore.search({ term }),
		playstore.search({ term, fullDetail: true }),
	])) as (appstore.SearchResult & playstore.SearchResult)[]
}







