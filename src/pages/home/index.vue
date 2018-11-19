<template>
  <el-container class="contanier-box">
    <el-aside width="200px" class="menu-wrapper">
      <el-menu default-active="1-4-1"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>

          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>

          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="wrapper-header">
          <div>
            <div>
              <el-radio-group v-model="lang" size="small">
                <el-radio label="zh" border>简体中文</el-radio>
                <el-radio label="en" border>English</el-radio>
                <el-radio label="es" border>Español</el-radio>
              </el-radio-group>
            </div>
          </div>
          <el-dropdown trigger="click">
            <el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click='logout'>{{ $t('navbar.logOut') }}</span></el-dropdown-item>
              <el-dropdown-item><span>中文</span></el-dropdown-item>
              <el-dropdown-item><span>英语</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$store.dispatch('LogOut')
        .then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
    }
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
  .contanier-box {
    height: 100%;

    .menu-wrapper {
      width: 200px;
      height: 100%;

      .el-menu-vertical-demo {
        height: 100%;
      }
    }

    .wrapper-header {
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
