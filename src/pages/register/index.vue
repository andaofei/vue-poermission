<template>
    <div class="">
      <h2>register</h2>
      <el-button @click="back">返回</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        methods: {
          back() {
              this.$router.go(-1)
          }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
