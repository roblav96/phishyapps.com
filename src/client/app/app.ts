// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'



@Vts.Component({
	components: {
		'v-navbar': () => import('@/client/components/navbar/navbar'),
	},
})
export default class extends Vue {

	initing = true
	mounted() {
		setTimeout(() => this.initing = false, 100)
		setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 100)
	}

}


