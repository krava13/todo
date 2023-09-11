<template>
  <el-button
    class="logout"
    type="danger"
    size="large"
    plain
    @click="logout">Logout</el-button>
</template>

<script>
  export default {
    name: 'logout',
    methods: {
      logout() {
        localStorage.clear()
        this.$router.push('/login')
      }
    },
  }
</script>

<style lang="scss" scoped>
.logout {
  width: 100%;
}
</style>