function(){
    //event apparently only fires once
    this.$el.imagesLoaded(_.bind(this.reLayout, this))
  }