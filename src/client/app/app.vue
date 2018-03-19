<!--  -->
<script lang="ts" src="./app.ts"></script>

<style lang="scss" src="@/client/styles/all.scss"></style>
<style src="@/client/styles/styles.css"></style>

<style>
/**/

/**/

</style>

<template>
	<div id="app" :class="{ 'animated-loading': initing, 'animated animated-fastester fadeIn': !initing }">
		<v-navbar></v-navbar>

		<router-view></router-view>

		<footer class="footer bg-accent py-4">
			<div class="container">
				<div class="content has-text-centered mb-2">
					"<i>There's something 'phishy' going on around here...</i>"
					<span class="is-size-4">🤔</span>
				</div>
				<div class="content has-text-centered">
					<a class="button mt-1" href="https://github.com/roblav96/phishyapps.com" target="_blank">
						<b-icon icon="github-circle" class="" />
						<span>Open Source</span>
					</a>
				</div>
			</div>
		</footer>
	</div>
</template>
