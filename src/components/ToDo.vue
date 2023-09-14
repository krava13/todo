<template>
	<div class="to-do">
		<el-divider border-style="dashed" />
		<create-to-do @addToDo="addToDo"></create-to-do>
		<el-divider border-style="dashed" />

		<el-input v-model="search" placeholder="Search..." size="large" clearable>
			<template #append>
				<el-icon>
					<Search />
				</el-icon>
			</template>
		</el-input>

		<el-divider border-style="dashed" />

		<el-select
			v-model="selectedFilter"
			placeholder="Filter"
			size="large"
			style="width: 100%"
			filterable
		>
			<el-option
				v-for="item in selectedList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			>
			</el-option>
		</el-select>

		<el-divider border-style="dashed" />
		<to-do-list
			v-loading="loading"
			@remove="removeToDo"
			@isFavorites="isFavoritesToDo"
			:toDoList="filteredToDo"
		></to-do-list>
	</div>
</template>

<script>
import axios from 'axios'
import CreateToDo from '@/components/todo/CreateToDo.vue'
import ToDoList from '@/components/todo/ToDoList.vue'

export default {
	name: 'to-do',
	components: {
		CreateToDo,
		ToDoList
	},
	mounted() {
		this.getToDoList()
	},
	computed: {
		searchToDo() {
			return this.toDoList.filter(item =>
				item.title.toLowerCase().includes(this.search.toLowerCase())
			)
		},
		filteredToDo: function () {
			switch (this.selectedFilter) {
				case 'completed':
					return this.searchToDo.filter(todo => todo.completed)
				case 'uncompleted':
					return this.searchToDo.filter(todo => !todo.completed)
				case 'favorites':
					return this.searchToDo.filter(todo => todo.favorites)
				default:
					return this.searchToDo
			}
		}
	},
	data() {
		return {
			loading: false,
			search: '',
			toDoList: [],
			selectedFilter: 'all',
			selectedList: [
				{ id: 1, label: 'All', value: 'all' },
				{ id: 2, label: 'Completed', value: 'completed' },
				{ id: 3, label: 'Uncompleted', value: 'uncompleted' },
				{ id: 4, label: 'Favorites', value: 'favorites' }
			]
		}
	},
	methods: {
		async getToDoList() {
			try {
				this.loading = true
				const { data } = await axios.get(
					`${import.meta.env.VITE_API_BASE_URL}/todos?_limit=10`
				)
				this.toDoList = data
				this.setFavorites()
			} catch (error) {
				console.log('Error: ', error)
			} finally {
				this.loading = false
			}
		},
		setFavorites() {
			if (!localStorage.getItem('idFavoritesList')) return
			const idFavoritesList = JSON.parse(
				localStorage.getItem('idFavoritesList')
			)

			this.toDoList = this.toDoList.map(todo => ({
				...todo,
				favorites: idFavoritesList.includes(todo.id)
			}))
		},
		addToDo(item) {
			this.toDoList.unshift(item)
		},
		removeToDo(item) {
			this.toDoList = this.toDoList.filter(e => e.id !== item.id)
		},
		isFavoritesToDo(item) {
			const idx = this.toDoList.findIndex(el => el.id === item.id)
			this.toDoList[idx].favorites = !this.toDoList[idx].favorites
			let idFavoritesList =
				JSON.parse(localStorage.getItem('idFavoritesList')) || []
			if (this.toDoList[idx].favorites) {
				idFavoritesList.push(this.toDoList[idx].id)
				localStorage.setItem('idFavoritesList', JSON.stringify(idFavoritesList))
			} else {
				const indexForIdFavoritesList = idFavoritesList.indexOf(
					this.toDoList[idx].id
				)
				idFavoritesList.splice(indexForIdFavoritesList, 1)
				localStorage.setItem('idFavoritesList', JSON.stringify(idFavoritesList))
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.to-do {
	margin-bottom: 20px;
}
</style>
