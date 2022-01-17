function (inside) {
      var pos = $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })

      if(this.options.position == 'fixed') {
        pos.top -= $(document).scrollTop();
        pos.left -= $(document).scrollLeft();
      }

      return pos
    }