// 

import * as appstore from 'app-store-scraper'
import * as playstore from 'google-play-scraper'





declare global {
	namespace Stores {
		type SearchResult = appstore.SearchResult & playstore.SearchResult & {
			apple: boolean
			android: boolean
			platform: 'apple' | 'android'
			fuzzy: number
		}
	}
}





