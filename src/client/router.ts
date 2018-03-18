// 

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'



export const routes = [

	{
		name: 'home', path: '/',
		dname: 'Home', icon: 'home',
		component: () => import('@/client/routes/home/home'),
	},

	{
		name: 'account', path: '/account',
		dname: 'Account', icon: 'security-account',
		component: () => import('@/client/routes/account/account'),
	},

	{ path: '*', redirect: { name: 'home' } },

] as Array<RouteConfig>



const router = new VueRouter({
	routes, mode: 'history',
	// linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-active',
})

export default router





declare module 'vue-router/types/router' {
	export interface RouteConfig {
		dname?: string
		icon?: string
	}
}


