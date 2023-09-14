<template>
	<div class="auth-layout">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'auth-layout'
}
</script>

<style lang="scss" scoped>
.auth-layout {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: linear-gradient(to top left, powderblue, pink);
}
</style>
