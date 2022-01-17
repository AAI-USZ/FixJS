function () {
        var i = $(img)
        i
          .attr('alt', image.caption)
          .data('resolution', {
            height: img.height, width: img.width
          })

        loadingShow.stop()
        morpheus(this.el.loading[0], {
            opacity: 0
          , duration: 50
          , complete: _.bind(function () {
              this.el.loading.css({
                  display: 'block'
                , opacity: 0
              })
            }, this)
        })
        callback(i)

      }