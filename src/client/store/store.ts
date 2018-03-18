// 

import Vue, { ComponentOptions } from 'vue'
import Vuex, { Store } from 'vuex'
import breakpoint from '@/client/store/breakpoint'



export class State {

	breakpoint = breakpoint

}
export const state = new State()

// console.log('state >', state)
// console.log('state >', JSON.stringify(state, null, 4))



export default new Vuex.Store<State>({
	state, strict: false,
	plugins: [],
	getters: {},
})





declare module 'vue/types/options' {
	export interface ComponentOptions<V extends Vue> {
		store?: Store<State>
	}
}

declare module 'vue/types/vue' {
	export interface Vue {
		$store: Store<State>
	}
}


