function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(val)
      return this.hide()
    }