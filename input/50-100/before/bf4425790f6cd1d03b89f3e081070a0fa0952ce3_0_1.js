function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.commit();
        return this.model.save({}, {
          success: function() {
            return app.vent.trigger('notice', 'Your info has been updated.');
          }
        });
      }