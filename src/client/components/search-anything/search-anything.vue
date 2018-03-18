<!--  -->
<script lang="ts" src="./search-anything.ts"></script>

<style>
/**/

/**/

</style>

<template>
	<b-field class="is-large" :class="{ 'fx-fill': this.focused }">

		<b-autocomplete class="is-large" type="search" placeholder="Search anything..." icon="magnify" v-model="search"
		    v-on:focus="focused = true" v-on:blur="focused = false" :data="results" :loading="busy" v-on:input="oninput"
		    v-on:select="onselect">
			<template slot-scope="props">
				<div class="media">
					<div class="media-left">
						image
					</div>
					<div class="media-content">
						result
					</div>
				</div>
			</template>
		</b-autocomplete>

	</b-field>
</template>
