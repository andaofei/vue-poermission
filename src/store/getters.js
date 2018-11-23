const getters = {
  roles: state => state.user.roles, // 角色
  token: state => state.user.token, // token
  addRouters: state => state.permission.addRouters, //动态路由
  language: state => state.lang.language // 国际化语言
}
export default getters
