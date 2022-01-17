function (el) {

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

  }