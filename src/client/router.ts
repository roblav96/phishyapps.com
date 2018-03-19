// 

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'



export const routes = [

	{
		name: 'home', path: '/',
		component: () => import('@/client/routes/home/home'),
	},

	{
		name: 'search', path: '/search',
		dname: 'Search', icon: 'magnify', bold: true,
		component: () => import('@/client/routes/search/search'),
	},

	{
		name: 'account', path: '/account',
		dname: 'Account', icon: 'security-account',
		component: () => import('@/client/routes/account/account'),
	},

	{
		name: 'product', path: '/product',
		component: () => import('@/client/routes/product/product'),
	},

	{
		name: 'takedown', path: '/takedown',
		component: () => import('@/client/routes/takedown/takedown'),
	},

	{ path: '*', redirect: { name: 'home' } },

] as Array<RouteConfig>



const router = new VueRouter({
	routes, mode: 'history',
	// linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-active',
})
export default router



router.afterEach(function(to, from) {
	window.scrollTo({ top: 0, behavior: 'instant' })
})





declare module 'vue-router/types/router' {
	export interface RouteConfig {
		dname?: string
		icon?: string
		bold?: boolean
	}
}


