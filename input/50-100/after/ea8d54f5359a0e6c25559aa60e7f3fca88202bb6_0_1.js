function (err, posts) {
      if (err) {
        this.terminate(503, err);
      } else {
        this.view['posts'] = posts;
        this.view['page'] = page;
        this.view['page_count'] = page_count;
        this.render();
      }
    }