function () {
        var i = $(img)
        i
          .attr('alt', image.caption)
          .data('resolution', {
            height: img.height, width: img.width
          })

        this.current = i
        callback(i)

      }