function () {
      this.pause()
      var last = track.find('.gallery-thumbnail').last()
        , left = parseInt(track.css('left'), 10)

      track.stop().animate({
          left: Math.max(
            left - track.parent().width(),
            -(last.position().left + last.width() - track.parent().width())
          )
      }, 300)
    }