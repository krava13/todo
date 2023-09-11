<template>
  <div class="main-layout">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'main-layout'
  }
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to top left, powderblue, pink);
}
</style>