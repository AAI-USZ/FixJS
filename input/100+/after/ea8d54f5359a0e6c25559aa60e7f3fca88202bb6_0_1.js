function (err, page_count) {
    if (err) {
      return this.terminate(503, err.message);
    }

    if (page === 0 || page > page_count) {
      return this.terminate(404);
    }

    this.$posts.getPagePosts(page, function (err, posts) {
      if (err) {
        this.terminate(503, err);
      } else {
        this.view['posts'] = posts;
        this.view['page'] = page;
        this.view['page_count'] = page_count;
        this.render();
      }
    }, this);
  }