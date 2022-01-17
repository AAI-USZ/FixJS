function(options) {
    this.stream = options.stream
    this.smallFrameView = new app.views.Post.SmallFrame({ model : this.model })
  }