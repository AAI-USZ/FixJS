function () {
      this.pause()
      var left = parseInt(track.css('left'), 10)
      morpheus(track[0], {
          left: Math.min(
            left + track.parent().width(),
            0
          )
        , duration: 300
      })
    }