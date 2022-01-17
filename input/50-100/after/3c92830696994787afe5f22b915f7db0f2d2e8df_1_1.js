function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 37: // left arrow
        case 39: // right arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }