function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }