function () {
          if (self.reload_on_login && self.$el.parent().length !== 0 && 
          (app.current.view === self || self.$el.hasClass('main_content'))) {
            self.render();
          }
        }