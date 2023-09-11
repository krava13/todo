<template>
  <div class="item" :class="{ item_completed: item.completed }">
    <div class="item__title">{{ item.title }}</div>
    <div class="item__btn">
      <div
        v-if="item.favorites"
        @click="$emit('isFavorites', item)"
        class="item__btn_pointer">&#128155;</div>
      <div
        v-else
        @click="$emit('isFavorites', item)"
        class="item__btn_pointer">&#129293;</div>
      <div
        @click="$emit('remove', item)"
        class="item__btn_pointer">❌</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'to-do-item',
    emits: ['remove', 'isFavorites'],
    props: {
      item: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border: 2px solid #888;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0px;
  }
  &__btn {
    width: 40px;
    display: flex;
    justify-content: space-between;
    &_pointer {
      cursor: pointer;
    }
  }
  &_completed{
    background: PaleGreen;
  }
}
</style>