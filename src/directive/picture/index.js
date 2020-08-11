import picture from './picture'

const install = function(Vue) {
  Vue.directive('picture', picture)
}

if (window.Vue) {
  window['picture'] = picture
  Vue.use(install); // eslint-disable-line
}

picture.install = install
export default picture
