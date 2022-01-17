function(content) {
          return page.create(views.wall({
            images: content.images
          }), {
            title: content.title,
            level: 2,
            scroll: true
          });
        }