function(options){
    this.stream = new app.models.Stream([], { collectionOptions: {} })
    this.stream.preloadOrFetch()

    this.title = options && options.title

    this.initSubviews()
  }