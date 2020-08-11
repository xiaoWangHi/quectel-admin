
// import Vue from 'vue'
import { MessageBox } from 'element-ui'
function handleClick(el, binding) {
  function handle(e) {
    const img = `<img src=${binding.value}/>`
    MessageBox({
      title: ' ',
      dangerouslyUseHTMLString: true,
      message: `<div>${img}</div>`,
      showCancelButton: false,
      showConfirmButton: false
    })
  }
  return handle
}

export default {
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
  }
}
