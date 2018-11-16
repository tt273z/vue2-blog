export default (Vue) => {
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
  Vue.directive('full', {
    bind: function (el) {
      el.style.width = '100%'
    }
  })
  Vue.directive('center', {
    bind: function (el) {
      el.style.textAlign = 'center'
    }
  })

}