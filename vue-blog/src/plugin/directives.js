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
    bind: function (el, binding) {
      if(binding.arg == 'width') {
        el.style.width = '100%'
      } else if (binding.arg == 'height') {
        el.style.height = '100%'
      } else {
        el.style.width = el.style.height = '100%'
      }
    }
  })
  Vue.directive('center', {
    bind: function (el) {
      el.style.textAlign = 'center'
    }
  })
  Vue.directive('margin', {
    bind: function(el, binding) {
      let arg = binding.arg, val = binding.value + 'px'
      if(arg == 'bottom') {
        el.style.marginBottom = val
      } else if (arg == 'top') {
        el.style.marginTop = val
      } else if (arg == 'left') {
        el.style.marginLeft = val
      } else if (arg == 'right') {
        el.style.marginRight = val
      } else if (arg == 'vr') {
        el.style.marginTop = el.style.marginBottom = val
      } else if (arg == 'hr') {
        el.style.marginLeft = el.style.marginRight = val
      }
    }
  })

}