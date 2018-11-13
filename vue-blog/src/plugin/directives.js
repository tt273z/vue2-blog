export default (Vue) => {
  console.log('ins')
  Vue.directive('fr', {
    bind: function (el) {
      el.style.cssFloat = 'right'
    }
  }),
  Vue.directive('fl', {
    bind: function (el) {
      el.style.cssFloat = 'left'
    }
  })
}