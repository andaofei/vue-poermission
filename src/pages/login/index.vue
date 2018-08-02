<template>
    <div class="box">
      <div class="wrapper">
      <el-form :label-position="labelPosition" label-width="80px" ref="ruleForm" :model="ruleForm">
        <el-form-item label="账号" prop="name" required>
          <el-input v-model="ruleForm.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" required>
          <el-input v-model="ruleForm.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>

        <router-link to="/register">注册</router-link>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState, mapMutations, mapActions} from 'vuex'
import authToken from '../../util/auth'
export default {
  data () {
    return {
      labelPosition: '50px',
      ruleForm: {
        name: '',
        pass: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.login()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(`/apis/v1/logins/`, {
            username: this.ruleForm.name,
            password: this.ruleForm.pass
          }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$router.push('/home')
            }
          })
            .catch((req) => {
              console.log(req)
            })
        } else {
          return false
        }
      })
    },
    ...mapActions({
      login: 'login'
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .box
    .wrapper
      padding-top 5%
      width 50%
      text-align center
      margin 0 auto
</style>
