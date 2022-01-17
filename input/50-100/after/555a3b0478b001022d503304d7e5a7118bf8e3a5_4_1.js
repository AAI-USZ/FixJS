function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev')) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }