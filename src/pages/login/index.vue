<template>
  <div class="box">
    <div class="wrapper">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        ref="ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="账号" prop="name" required>
          <el-input v-model="ruleForm.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" required>
          <el-input v-model="ruleForm.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm('ruleForm');"
          >{{ $t('login.logIn') }}
          </el-button
          >
        </el-form-item>
      </el-form>

      <div>
        <el-radio-group v-model="lang" size="small">
          <el-radio label="zh" border>简体中文</el-radio>
          <el-radio label="en" border>English</el-radio>
          <el-radio label="es" border>Español</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState, mapMutations, mapActions} from 'vuex'
// import authToken from '../../util/auth'
export default {
  data () {
    return {
      labelPosition: '50px',
      ruleForm: {
        name: 'admin',
        pass: '123456'
      },
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        // console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login({username: this.ruleForm.name, password: this.ruleForm.pass})
            .then(() => {
              console.log(this.redirect, 'this.redirect')
              this.$router.push({path: this.redirect || '/'})
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    ...mapActions({
      login: 'login'
    })
  },
  computed: {
    lang: {
      get () {
        return this.$store.state.lang.language
      },
      set (lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    }
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
