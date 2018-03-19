<!--  -->
<script lang="ts" src="./navbar.ts"></script>

<style>
/**/

html.has-navbar-fixed-top .hero.is-fullheight {
	min-height: calc(100vh - 3.25rem);
}

.navbar-item img.image {
	max-height: initial !important;
}

/**/

</style>

<template>
	<nav class="navbar is-fixed-top has-shadow">
		<div class="container">

			<div class="navbar-brand">
				<router-link class="navbar-item" :to="{ name: 'home' }" active-class="" exact-active-class="">
					<img src="@/assets/logo-primary.svg">
					<span class="ml-2 is-size- t-500">PhishyApps</span>
				</router-link>
				<!-- <div class="navbar-item">
					<v-searchbar />
				</div> -->
				<div class="fx-fill is-hidden-desktop"></div>
				<a class="navbar-item is-hidden-desktop" v-on:click="isMenu = !isMenu">
					<b-icon icon="menu" />
				</a>
			</div>

			<div class="navbar-menu" :class="{ 'is-active': isMenu }">
				<div class="navbar-end">
					<router-link class="navbar-item" :to="{ name: 'search' }">
						<b-icon class="mr-2 t-bold" icon="magnify" /> Search
					</router-link>
					<router-link class="navbar-item" :to="{ name: 'account' }">
						<b-icon class="mr-2" icon="security-account" /> Account
					</router-link>
				</div>
			</div>

		</div>
	</nav>
</template>
