function (index, pause) {

  if (pause) clearInterval(this.interval)

  // Loop back to zero
  if (index === this.images.length && this.options.loop) {
    index = 0
  }

  // Don't error if asked to go to a slide that
  // doesn't exist, or the current slide. Return silently
  if (index < 0 || index >= this.images.length || index === this.index) {
    return this
  }

  $(this).trigger('change', index)

  var previous = this.current
    , image = this.images[index]

  this.renderSlideCallback = _.bind(function (el) {

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

    if (previous) {
      morpheus(previous[0], {
          opacity: 0
        , duration: 300
        , complete: function () {
          previous.remove()
        }
      })
    }

  }, this)

  this._renderSlide(image, this.renderSlideCallback)

  this.index = index
  return this

}