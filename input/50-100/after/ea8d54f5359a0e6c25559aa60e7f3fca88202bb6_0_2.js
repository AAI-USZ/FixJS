function (err, post) {
    if (err) {
      return this.terminate(503, err);
    } else if (!post) {
      return this.terminate(404, 'No such post');
    }

    this.view['post'] = post;
    this.render();
  }