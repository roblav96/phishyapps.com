// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'
import VUtils from '@/client/mixins/v-utils'



@Vts.Component({
	components: {
		'v-navbar': () => import('@/client/components/navbar/navbar'),
	},
})
export default class extends Mixins(VUtils) {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}



}


