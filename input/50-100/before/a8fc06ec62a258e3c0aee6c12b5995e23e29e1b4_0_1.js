function(){
    this.canvasView = new app.views.Canvas({model : this.stream})
    this.headerView = new app.views.Header({model : this.stream})

    this.canvasView.postClass = app.views.Post.ConversationFrame
  }