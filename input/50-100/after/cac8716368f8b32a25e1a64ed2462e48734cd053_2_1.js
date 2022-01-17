function () {
          if (self.reload_on_login && self.$el.parent().length !== 0) {
            self.render();
          }
        }