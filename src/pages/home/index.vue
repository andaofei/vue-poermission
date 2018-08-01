<template>
    <div class="">
          <h2>主页</h2>
      <router-link to="/mange">mange</router-link>
      <el-button @click="logout">注销</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie'
export default {
  data () {
    return {}
  },
  methods: {
    logout() {
      Cookies.remove('isLogin')
        setTimeout(() => {
          this.$router.push('/login')
        }, 300)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
