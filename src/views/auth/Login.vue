<template>
  <div class="login" shadow="hover">
    <div class="login__title">Welcome 🇺🇦</div>
    <el-form
      @submit.native.prevent="submitForm('form')"
      v-loading="loading"
      :model="form"
      ref="form"
      :rules="rules"
      size="large"
      status-icon
      label-width="0">
        <el-form-item prop="username">
          <el-input
            v-model.trim="form.username"
            placeholder="Username"
            clearable />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="Phone number"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login__btn"
            type="primary"
            native-type="submit">
              Login
          </el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import { ElNotification } from 'element-plus'

  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        form: {
          username: 'Bret',
          phone: '1-770-736-8031 x56442',
        },
        rules: {
          username: [
            { required: true, message: 'Username is required', trigger: 'blur' },
            { pattern: /^[a-zA-Z]+$/, message: 'Username should contain only letters', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: 'Phone number is required', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (!/^[0-9()\s+-x]*$/.test(value)) {
                  callback(new Error('Invalid phone number format'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      submitForm(ref) {
        this.$refs[ref].validate(async (valid) => {
          if (valid) {
            try {
              this.loading = true
              const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`)
              if (!this.checkCredentials(data)) {
                ElNotification({ title: 'Warning', message: 'Login error!', type: 'warning', })
                return false
              }
              localStorage.setItem('userId', this.checkCredentials(data))
              this.$router.push('/main')
            } catch (error) {
              console.log("Error: ", error)
            } finally {
              this.loading = false
            }
          } else {
            return false
          }
        })
      },
      checkCredentials(usersList) {
        for (const user of usersList) {
          if (user.username === this.form.username && user.phone === this.form.phone) {
            return user.id
          }
        }
        return false
      }
    },
  }
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  border-radius: 20px;
  background: #fff;
  padding: 50px 40px;
  &__title {
    font-size: 20px;
    text-align: right;
    margin: 10px 0;
  }
  &__btn {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
}
</style>