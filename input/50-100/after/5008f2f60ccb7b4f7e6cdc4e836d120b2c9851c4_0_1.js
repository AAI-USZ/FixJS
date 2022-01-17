function() {
    /* init view */
    this.navView = new app.views.PostViewerNav({ model : this.model });
    this.feedbackView = new app.views.ViewerFeedbackActions({model : this.model})

    this.postView = new app.views.Post.SmallFrame({
       model : this.model,
       className : "canvas-frame"
    });

    this.headerView = new app.views.Header({})
    this.render();
  }