<!--  -->
<script lang="ts" src="./search.ts"></script>

<style>
/**/

/**/

</style>

<template>
	<section class="hero is-light is-fullheight">
		<div class="hero-body fx-align-items-start">
			<div class="container">
				<div class="box content">
					<p>Search for your app then take action on select results.</p>
				</div>
				<b-field>
					<b-input ref="search_input" class="is-medium" size="is-medium" type="search" icon="magnify" placeholder="Search App Store & Play Store..."
					    v-model="query" v-on:input="oninput" :loading="busy"></b-input>
				</b-field>

				<b-table class="t-lh-initial" :data="results" :loading="busy">
					<template slot-scope="props">
						<b-table-column field="icon" label="Icon">
							<img class="image is-32x32" :src="props.row.icon">
						</b-table-column>
						<b-table-column field="id" label="Name" class="t-nowrap">
							<b-icon class="mr-1" :icon="props.row.platform" size="is-small" />
							<span class="t-500">{{ v_truncate(props.row.title, 32) }}</span>
							<br>
							<span class="is-size-7">({{ props.row.appId }})</span>
						</b-table-column>
						<b-table-column field="description" label="Description">
							{{ props.row.description }}
						</b-table-column>
						<b-table-column field="fuzzy" label="Score">
							{{ props.row.fuzzy }}
						</b-table-column>
						<b-table-column label="Action">
							<router-link class="button is-danger " :to="{ name: 'takedown', query: { appid: props.row.appId, platform: props.row.platform } }">
								<b-icon icon="gavel" />
								<span>Take Down</span>
							</router-link>
						</b-table-column>
					</template>
				</b-table>

			</div>
		</div>
	</section>
</template>
