function () {
      this.pause()
      var last = track.find('.gallery-thumbnail').last()
        , left = parseInt(track.css('left'), 10)

      morpheus(track[0], {
          left: Math.max(
            left - track.parent().width(),
            -(last.position().left + last.width() - track.parent().width())
          )
        , duration: 300
      })
    }