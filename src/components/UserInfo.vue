<template>
	<div class="card" v-loading="loading">
		<div class="card__title" v-text="`Hello ${data?.username} 👋🏻`"></div>
		<p class="card__info">
			As you know that on the Internet you can get any information about a
			person, so this is what I managed to find out about you: Your full name -
			<el-tag type="success" size="small">{{ data?.name }}</el-tag
			>, the call was from this phone number -
			<el-tag type="success" size="small">{{ data?.phone }}</el-tag
			>, company name -
			<el-tag type="success" size="small">{{ data?.company.name }}</el-tag
			>, your coordinates - (<el-tag type="success" size="small"
				>{{ data?.address?.geo.lat }}, {{ data?.address?.geo.lng }}</el-tag
			>). We are following you, be careful! 😅
		</p>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'user-info',
	mounted() {
		this.getUser()
	},
	data() {
		return {
			loading: false,
			data: null
		}
	},
	methods: {
		async getUser() {
			try {
				this.loading = true
				const { data } = await axios.get(
					`${import.meta.env.VITE_API_BASE_URL}/users/${localStorage.getItem(
						'userId'
					)}`
				)
				this.data = data
			} catch (error) {
				console.log('Error: ', error)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	flex-direction: column;
	&__title {
		text-align: center;
		font-size: 24px;
		margin-bottom: 10px;
	}
	&__info {
		color: #888;
		font-size: 20px;
		line-height: 26px;
		text-align: justify;
	}
}
</style>
