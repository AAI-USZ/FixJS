function () {
      this.hide()
      this.$element.off(this.options.ns).removeData('tooltip')
    }