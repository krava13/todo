<template>
  <div class="main-page">
    <user-info></user-info>
    <to-do></to-do>
    <logout></logout>
  </div>
</template>

<script>
  import UserInfo from '@/components/UserInfo.vue'
  import ToDo from '@/components/ToDo.vue'
  import Logout from '@/components/Logout.vue'

  export default {
    name: 'main-page',
    components: {
      UserInfo,
      ToDo,
      Logout
    },
  }
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 20px 20px;
  padding: 30px 40px;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>