function (e, index) {
    var thumb = track.find('.gallery-thumbnail').eq(index)


    if (thumb.position().left + thumb.width() >
        track.parent().width() - parseInt(track.css('left'), 10)) {

      // Offscreen to the right
      var last = track.find('.gallery-thumbnail').last()

      morpheus(track[0], {
          left: Math.max(
              -(thumb.position().left + thumb.width() - track.parent().width())
            , -(last.position().left + last.width() - track.parent().width())
            )
        , duration: 300
      })

    } else if (-thumb.position().left > parseInt(track.css('left'), 10)) {

      // Offscreen to the left
      morpheus(track[0], {
          left: -thumb.position().left
        , duration: 300
      })

    }

  }