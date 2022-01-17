function (err, post) {
    this.view['post'] = post;
    this.render();
  }