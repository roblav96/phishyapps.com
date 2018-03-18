<!--  -->
<script lang="ts" src="./navbar.ts"></script>

<style>
/**/

/**/

</style>

<template>
	<nav class="navbar is-fixed-top has-shadow">
		<div class="container">
			<div class="navbar-brand">

				<router-link class="navbar-item" :to="{ name: 'home' }" active-class="" exact-active-class="">
					<img class="mr-2" src="@/assets/logo-primary.svg">
					<!-- <span class="ml-1 is-size-5 t-400">PhishyApps</span> -->
				</router-link>

				<div class="d-flex fx-fill is-hidden-desktop"></div>
				<a class="navbar-item is-hidden-desktop" v-on:click="isMenu = !isMenu">
					<b-icon icon="menu" />
				</a>

			</div>

			<div class="navbar-menu" :class="{ 'is-active': isMenu }">

				<div class="navbar-item fx-fill">
					<v-search-anything />
				</div>

				<div class="navbar-end">
					<router-link class="navbar-item" :to="{ name: 'account' }">
						<b-icon class="mr-2" icon="security-account" />
						<span>Account</span>
					</router-link>
				</div>
			</div>

		</div>
	</nav>
</template>
