function (image, callback) {

  var img = new Image()

    , handleLoad = _.bind(function () {
        var i = $(img)
        i
          .attr('alt', image.caption)
          .data('resolution', {
            height: img.height, width: img.width
          })

        this.current = i
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