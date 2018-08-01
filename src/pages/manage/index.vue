<template>
    <div class="">
      <el-button @click="back">返回</el-button>
        manage
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
