<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <!--<navbar/>-->
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Sidebar from './components/Sidebar'
import AppMain from './AppMain'
import Navbar from './Navbar'
import TagsView from './TagsView'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView
  },
  data () {
    return {
    }
  },
  methods: {
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    },
    logout () {
      this.$store.dispatch('FedLogOut')
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
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
