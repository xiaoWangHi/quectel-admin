const getters = {
  menuActive: state => state.app.menuActive,
  userInfo: state => state.user.userInfo,
  size: state => state.app.size,
  addRoutes: state => state.permission.addRoutes,
  permission_routes: state => state.permission.routes,
  date: state => state.globals.date,
  upBtn: state => state.globals.upBtn,
  mode: state => state.globals.mode,
  isBreadCrumb: state => state.globals.isBreadCrumb,
  isCollapse: state => state.globals.isCollapse,
  needTagsView: state => state.tagsView.needTagsView,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}

export default getters
