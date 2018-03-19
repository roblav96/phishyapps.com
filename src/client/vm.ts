// 

import 'animate.css'
import '@ibm/plex/css/ibm-plex.css'
import 'mdi/css/materialdesignicons.css'
import '@/client/services/pwa-service-worker'
import router from '@/client/router'
import store from '@/client/store/store'
import App from '@/client/app/app'



export default new App({ router, store }).$mount('#app')


