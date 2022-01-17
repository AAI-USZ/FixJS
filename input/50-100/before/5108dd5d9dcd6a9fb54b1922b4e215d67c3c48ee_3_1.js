function(content) {
          return page.create(views.profile({
            username: content.username
          }));
        }