function (index, pause) {

  if (pause) clearInterval(this.interval)

  // Loop back to zero?
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

  this.imageShown = false

  // Show loader
  this.el.loading.css({ display: 'block', opacity: 0 })
  this.el.loading.stop().animate({
    opacity: 1
  }, 50)

  this._renderImage(image, _.bind(this._showNextImage, this))

  this.index = index
  return this

}