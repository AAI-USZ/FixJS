function() {
    if(!(this.model.get("photos") || [])[0]) { return }

    var modifiers = [this.dimensionsClass(), this.textClasses(), this.$el.attr('class')].join(' ')
      , firstPhoto = this.model.get("photos")[0]
      , width = (modifiers.search("x2") != -1 ? this.DOUBLE_COLUMN_WIDTH : this.SINGLE_COLUMN_WIDTH)
      , ratio = width / firstPhoto.dimensions.width
      , returnValue = ratio * firstPhoto.dimensions.height;

    returnValue = this.model.get("show_screenshot") ? returnValue + 10 : returnValue;

    return(returnValue)
  }