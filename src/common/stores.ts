// 

import * as appstore from 'app-store-scraper'
import * as playstore from 'google-play-scraper'





declare global {
	namespace Stores {
		type SearchResult = appstore.SearchResult & playstore.SearchResult & {
			appstore: boolean
			playstore: boolean
			fuzzy: number
		}
	}
}





