function(e) {
        var errors;
        e.preventDefault();
        e.stopPropagation();
        errors = this.commit();
        if (errors == null) {
          return this.model.save({}, {
            success: function() {
              return app.vent.trigger('notice', 'Your info has been updated.');
            }
          });
        }
      }