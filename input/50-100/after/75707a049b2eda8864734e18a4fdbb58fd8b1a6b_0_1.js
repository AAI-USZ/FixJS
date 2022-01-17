function () {
      var val = JSON.parse(this.$menu.find('.active').attr('data-value'))
            , text

      if (!this.strings) text = val[this.options.property]
      else text = val

      this.$element.val(this.updater(text)).change()

      if (typeof this.onselect == "function")
          this.onselect(val)

      return this.hide()
    }