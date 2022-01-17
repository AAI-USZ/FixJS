function (image, callback) {

  this.el.loading.css({
      display: 'block'
    , opacity: 0
  })
  var loadingShow = morpheus(this.el.loading[0], {
      opacity: 1
    , duration: 50
  })

  var img = new Image()

    , handleLoad = _.bind(function () {
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

      }, this)

    , handleError = _.bind(function (e) {

        callback($(new Image()))

      })

  $(img).on('load', handleLoad)
  $(img).on('error', handleLoad)
  img.src = image.full

  return this

}