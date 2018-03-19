<!--  -->
<script lang="ts" src="./home.ts"></script>

<style>
/**/

div.home-boxes span.icon {
	width: initial;
	height: initial;
}

div.home-boxes span.icon > i.mdi,
div.home-boxes span.icon > i.mdi:before {
	font-size: 250%;
	line-height: 1;
}

/**/

</style>

<template>
	<section>

		<section class="hero is-bold is-primary is-medium">
			<div class="hero-body fx-align-items-start">
				<div class="container">
					<div class="columns">
						<div class="column is-10 is-offset-1 has-text-centered">
							<!-- <img class="mb-4" style="max-width: 150px;" width="33%" src="@/assets/logo-white.svg"> -->
							<h1 class="title t-300 t-lh-2">
								Taking down malicious phishing apps
								<br><b>is now automated</b>
							</h1>
							<hr>
							<h2 class="subtitle">
								The PhishyApps platform aims to simplify the process of taking down
								<i>'phishy'</i> apps published on the iTunes App Store & Google Play Store. Managing these fake
								malicious imposters is now possible.
							</h2>
							<router-link class="button is-medium is-light" :to="{ name: 'search' }">
								<b-icon icon="security" />
								<span class="t-500">Secure My App</span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div class="columns is-multiline home-boxes">
					<div v-for="box in boxes" class="column is-6">
						<div class="box h-100">
							<div class="has-text-centered">
								<b-icon :icon="box.icon" type="is-primary" class="mb-3" />
								<p class="is-size-4 t-500">{{ box.title }}</p>
							</div>
							<hr class="my-3">
							<p>{{ box.desc }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

	</section>
</template>
