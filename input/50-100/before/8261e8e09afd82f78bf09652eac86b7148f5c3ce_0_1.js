function(post) {
    var postView = this.createPostView(post)
    postView.render()
    this.addToViewBuffer(postView.el)
  }