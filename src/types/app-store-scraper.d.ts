/** Declaration file generated by dts-gen */

declare module 'app-store-scraper' {

	export const collection: {
		NEW_APPS_IOS: string
		NEW_GAMES_IOS: string
		TOP_FREE_GAMES_IOS: string
		TOP_FREE_IOS: string
		TOP_FREE_IPAD: string
		TOP_FREE_MAC: string
		TOP_GROSSING_IOS: string
		TOP_GROSSING_IPAD: string
		TOP_GROSSING_MAC: string
		TOP_MAC: string
		TOP_PAID_GAMES_IOS: string
		TOP_PAID_IOS: string
		TOP_PAID_MAC: string
	}

	export const device: {
		ALL: string
		IPAD: string
		MAC: string
	}

	export const markets: {
		AE: number
		AI: number
		AM: number
		AO: number
		AR: number
		AT: number
		AU: number
		AZ: number
		BB: number
		BE: number
		BG: number
		BH: number
		BM: number
		BN: number
		BO: number
		BR: number
		BW: number
		BY: number
		BZ: number
		CA: number
		CH: number
		CL: number
		CN: number
		CO: number
		CR: number
		CY: number
		CZ: number
		DE: number
		DK: number
		DM: number
		DZ: number
		EC: number
		EE: number
		EG: number
		ES: number
		FI: number
		FR: number
		GD: number
		GH: number
		GR: number
		GT: number
		GY: number
		HK: number
		HN: number
		HR: number
		HU: number
		ID: number
		IE: number
		IL: number
		IN: number
		IS: number
		IT: number
		JM: number
		JO: number
		JP: number
		KE: number
		KW: number
		KY: number
		LB: number
		LK: number
		LT: number
		LU: number
		LV: number
		MG: number
		MK: number
		ML: number
		MO: number
		MS: number
		MT: number
		MU: number
		MX: number
		MY: number
		NE: number
		NG: number
		NI: number
		NL: number
		NO: number
		NP: number
		NZ: number
		OM: number
		PA: number
		PE: number
		PH: number
		PK: number
		PL: number
		PT: number
		PY: number
		QA: number
		RO: number
		RU: number
		SA: number
		SE: number
		SG: number
		SI: number
		SK: number
		SN: number
		SR: number
		SV: number
		TH: number
		TN: number
		TR: number
		TW: number
		TZ: number
		UA: number
		UG: number
		US: number
		UY: number
		UZ: number
		VE: number
		VG: number
		VN: number
		YE: number
		ZA: number
	}

	export const sort: {
		HELPFUL: string
		RECENT: string
	}

	export function app(opts: any): Promise<any>

	export function list(opts: any): Promise<any>

	export function memoized(opts: any): Promise<any>

	export function reviews(opts: any): Promise<any>

	export function search(opts: {
		term: string
		num?: number
		page?: number
		country?: string
		lang?: string
	}): Promise<SearchResult[]>

	export function similar(opts: any): Promise<any>

	export function suggest(opts: any): Promise<any>

	export interface SearchResult {
		appId: string
		appletvScreenshots: string[]
		contentRating: string
		currency: string
		currentVersionReviews: number
		currentVersionScore: number
		description: string
		developer: string
		developerId: number
		developerUrl: string
		developerWebsite: string
		free: boolean
		genreIds: string[]
		genres: string[]
		icon: string
		id: number
		ipadScreenshots: string[]
		languages: string[]
		price: number
		primaryGenre: string
		primaryGenreId: number
		releaseNotes: string
		released: string
		requiredOsVersion: string
		reviews: number
		score: number
		screenshots: string[]
		size: string
		supportedDevices: string[]
		title: string
		updated: string
		url: string
		version: string
	}

}


