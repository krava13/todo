<template>
	<div v-if="toDoList.length">
		<transition-group name="list">
			<to-do-item
				v-for="item of toDoList"
				:key="item.id"
				:item="item"
				@remove="$emit('remove', item)"
				@isFavorites="$emit('isFavorites', item)"
			></to-do-item>
		</transition-group>
	</div>
	<div v-else class="isEmpty">Todo list is empty!</div>
</template>

<script>
import ToDoItem from '@/components/todo/ToDoItem.vue'

export default {
	name: 'to-do-list',
	emits: ['remove', 'isFavorites'],
	components: {
		ToDoItem
	},
	props: {
		toDoList: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.isEmpty {
	text-align: center;
	color: red;
}
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(130px);
}
</style>
