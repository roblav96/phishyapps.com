// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'



@Vts.Component({
	components: {
		'v-search-anything': () => import('@/client/components/search-anything/search-anything'),
	},
})
export default class extends Vue {

	isMenu = false

	created() {
		document.documentElement.classList.add('has-navbar-fixed-top')
	}

	mounted() {
		
	}

	beforeDestroy() {

	}



}


