function(e) {
        e.preventDefault();
        e.stopPropagation();
        return $.ajax({
          url: '/api/user/password',
          type: 'POST',
          data: JSON.stringify({
            current_password: this.$('input[name="current_password"]').val(),
            new_password: this.$('input[name="new_password"]').val()
          }),
          success: function() {
            return app.vent.trigger('notice', 'Your password has been updated.');
          }
        });
      }