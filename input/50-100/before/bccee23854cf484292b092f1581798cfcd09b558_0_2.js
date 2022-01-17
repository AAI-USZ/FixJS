function(evt) {
    /* ignore enter, space bar, arrow keys */
    if(_.include([13, 32, 37, 38, 39, 40], evt.keyCode)) { return }

    this.interactionsView.invokePane();
    $('#new-post-comment textarea').focus();
  }