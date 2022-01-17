function (e) {
      if (!this.shown || this.suppressKeyPressRepeat) return
      this.move(e)
    }