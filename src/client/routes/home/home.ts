// 

import * as Vts from 'vue-property-decorator'
import { mixins as Mixins } from 'vue-class-component'
import Vue from 'vue'



Vts.Component
export default class extends Vue {

	created() {

	}

	mounted() {

	}

	beforeDestroy() {

	}

	boxes = [
		{ icon: 'radar', title: '24/7 Publish Monitoring', desc: 'The backend is processing store publishings 24/7 and identifying phishy apps on the iTunes App Store & Google Play Store.' },
		{ icon: 'magnify', title: 'Search & Discover Phishy Apps', desc: 'Find your app by app_name or app_id to see a list of phishy apps.' },
		{ icon: 'bell-ring', title: 'Instant Email/SMS Alerts', desc: 'Provide an email or sms to receive alerts immediately when something phishy is published.' },
		{ icon: 'gavel', title: 'Automate Issuing Takedown Notices', desc: 'Automatically file and issue Takedown Notice\'s with the violators developer, company, publisher, related app store, proper authorities, etc.' },
		// { icon: '____', title: '____', desc: '____' },
	]

}


