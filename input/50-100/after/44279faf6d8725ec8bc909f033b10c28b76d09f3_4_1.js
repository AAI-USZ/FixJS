function(content) {
          if (content.status === 200) {
            return page.create(views.profile({
              title: content.title,
              user: content.user,
              imageUrl: content.imageUrl
            }));
          } else {
            return page.create(views.message({
              message: content.message
            }));
          }
        }