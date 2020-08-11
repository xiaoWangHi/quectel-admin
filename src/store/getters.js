const getters = {
  menuActive: state => state.app.menuActive,
  userInfo: state => state.user.userInfo,
  size: state => state.app.size,
  addRoutes: state => state.permission.addRoutes,
  permission_routes: state => state.permission.routes,
  date: state => state.globals.date,
  upBtn: state => state.globals.upBtn,
  isBreadCrumb: state => state.globals.isBreadCrumb,
  needTagsView: state => state.tagsView.needTagsView,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}

export default getters
