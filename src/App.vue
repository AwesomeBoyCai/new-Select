<template>
	<div id="app">
		<h1>用户选择器 Demo</h1>
		<user-selector-demo />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserSelectorDemo from './user.vue';

export default defineComponent({
	components: {
		UserSelectorDemo,
	},
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
