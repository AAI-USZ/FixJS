function (index, pause) {

  if (pause) clearInterval(this.interval)

  // Loop back to zero
  if (index === this.images.length && this.options.loop) {
    index = 0
  }

  // Don't error if asked to go to an image that
  // doesn't exist, or the current image. Return silently
  if (index < 0 || index >= this.images.length || index === this.index) {
    return this
  }

  $(this).trigger('change', index)

  var image = this.images[index]

  if (this.current) this.previous.push(this.current)

  this.showNextImage = _.bind(function (el) {

    this.current = el

    this.current.css({
      opacity: 0
    })

    this.el.main.prepend(this.current)

    morpheus(this.current[0], {
        opacity: 1
      , duration: 300
    })

    this._updateImage(el)

    this.el.caption.empty()
      .append(captionTemplate({
          index: index + 1
        , total: this.images.length
        , caption: image.caption
        , credit: image.credit
      }))

    this._clearPrevious()

  }, this)

  this._renderImage(image, this.showNextImage)

  this.index = index
  return this

}