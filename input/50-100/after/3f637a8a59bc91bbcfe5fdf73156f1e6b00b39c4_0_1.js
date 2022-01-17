function(post) {
    //if this is prepend, do it eagarly, if not, use the buffer :(
    var placeInStream = (this.collection.at(0).id == post.id) ? "prepend" : "append";
    var postView = this.createPostView(post)
    postView.render()
    var el = postView.el
    if(placeInStream == 'prepend'){
      this.$el[placeInStream](this.createPostView(post).render().el);
    } else{
      this.addToViewBuffer(postView.el)
    }
  }