function () {
      this.pause()
      var left = parseInt(track.css('left'), 10)
      track.stop().animate({
          left: Math.min(
            left + track.parent().width(),
            0
          )
      }, 300)
    }