function (event) {
      var that = this
        , items
        , q
        , value

      this.query = this.$element.val()

      if (typeof this.source == "function")
        value = this.source(this, this.query)
        if (value)
          this.process(value)
      else
        this.process(this.source)
    }