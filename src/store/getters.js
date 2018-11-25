const getters = {
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  roles: state => state.user.roles,
  token: state => state.user.token, // user token
  addRouters: state => state.permission.addRouters, // asyncRouterMap
  permission_routers: state => state.permission.routers, // new router
  language: state => state.lang.language, // lang
  sidebar: state => state.lang.sidebar,
  // new
  size: state => state.lang.size,
  device: state => state.lang.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
