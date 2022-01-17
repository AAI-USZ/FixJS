function (err, page_count) {
    if (page === 0 ||page > page_count) {
      this.response.head(404);
      return;
    }

    this.posts.getPagePosts(page, function (err, posts) {
      if (err) {
        this.response.head(503).body(err).end();
      } else {
        this.view['posts'] = posts;
        this.view['page'] = page;
        this.view['page_count'] = page_count;
        this.render();
      }
    }, this);
  }