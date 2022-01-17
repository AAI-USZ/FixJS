function (e) {
      if (!e) this.paused = true
      clearInterval(this.interval)
      this.interval = null
      return this
    }