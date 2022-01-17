function () {

  if (this.imageShown) return this
  this.imageShown = true

  // Hide loader
  this.el.loading.stop().animate({
    opacity: 0
  }, 50, _.bind(function () {
    this.el.loading.css({
        display: 'block'
      , opacity: 0
    })
  }, this))

  this.current.css({
    opacity: 0
  })

  this.el.main.prepend(this.current)

  this.current.stop().animate({
    opacity: 1
  }, 300)

  this._updateImage(this.current)

  this.el.caption.empty()
    .append(captionTemplate({
        index: this.index + 1
      , total: this.images.length
      , caption: this.images[this.index].caption
      , credit: this.images[this.index].credit
    }))

  this._clearPrevious()

  return this

}