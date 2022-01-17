function(options) {
    this.stream = options.stream
    this.smallFrameView = new app.views.Post.SmallFrame({ model : this.model })
    
    //:( we are double instanticating this via the parent and a getter method where we do not memoize
    this.feedbackView = new app.views.StreamFeedbackActions({ model: this.model })
  }