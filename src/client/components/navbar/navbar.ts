// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import VUtils from '@/client/mixins/v-utils'



@Vts.Component({
	components: {
		'v-searchbar': () => import('@/client/components/searchbar/searchbar'),
	},
})
export default class extends Mixins(VUtils) {

	isMenu = false

	created() {
		document.documentElement.classList.add('has-navbar-fixed-top')
	}

	mounted() {
		
	}

	beforeDestroy() {

	}



}


