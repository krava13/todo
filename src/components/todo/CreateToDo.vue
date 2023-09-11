<template>
  <div class="create-to-do">
    <el-form
      @submit.native.prevent="submitForm('form')"
      v-loading="loading"
      :model="form"
      ref="form"
      :rules="rules"
      size="large"
      status-icon
      label-width="0">
        <el-form-item prop="userId">
          <el-input
            v-model.trim.number="form.userId"
            placeholder="User ID"
            clearable />
        </el-form-item>
        <el-form-item prop="title">
          <el-input
            v-model="form.title"
            placeholder="Title"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button
            class="create-to-do__btn"
            type="primary"
            native-type="submit">
              Create
          </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'create-to-do',
    emits: ['addToDo'],
    data() {
      return {
        loading: false,
        form: {
          userId: null,
          title: null,
        },
        rules: {
          userId: [
            { required: true, message: 'User Id is required', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: 'Invalid user id format', trigger: 'blur' },
          ],
          title: [
            { required: true, message: 'Title is required', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      submitForm(ref) {
        this.$refs[ref].validate(async (valid) => {
          if (valid) {
            this.loading = true
            this.$emit('addToDo', { id: Date.now(), completed: false, ...this.form })
            this.form.userId = this.form.title = null
            this.loading = false
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.create-to-do {
  &__btn {
    width: 100%;
  }
}
</style>