function (e, index) {
    var thumb = track.find('.gallery-thumbnail').eq(index)


    if (thumb.position().left + thumb.width() >
        track.parent().width() - parseInt(track.css('left'), 10)) {

      // Offscreen to the right
      var last = track.find('.gallery-thumbnail').last()

      track.stop().animate({
          left: Math.max(
              -(thumb.position().left + thumb.width() - track.parent().width())
            , -(last.position().left + last.width() - track.parent().width())
            )
      }, 300)

    } else if (-thumb.position().left > parseInt(track.css('left'), 10)) {

      // Offscreen to the left
      track.stop().animate({
          left: -thumb.position().left
      }, 300)

    }

  }