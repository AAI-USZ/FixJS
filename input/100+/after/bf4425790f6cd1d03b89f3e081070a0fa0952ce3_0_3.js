function(_super) {

      __extends(PasswordForm, _super);

      function PasswordForm() {
        return PasswordForm.__super__.constructor.apply(this, arguments);
      }

      PasswordForm.prototype.template = require('jade!../templates/password-form')();

      PasswordForm.prototype.events = {
        'click button[type="submit"]': 'commitChanges'
      };

      PasswordForm.prototype.commitChanges = function(e) {
        var errors;
        e.preventDefault();
        e.stopPropagation();
        errors = this.validate();
        if (errors == null) {
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
      };

      PasswordForm.prototype.schema = {
        current_password: {
          title: 'Current Password',
          type: 'Password'
        },
        new_password: {
          title: 'New Password',
          type: 'Password',
          validators: [
            function(value, formValues) {
              var lengthError;
              lengthError = {
                type: 'Password',
                message: 'Password must be at least 8 characters long.'
              };
              if (value.length < 8) {
                return lengthError;
              }
            }
          ]
        }
      };

      PasswordForm.prototype.fieldsets = [
        {
          legend: 'Change Password',
          fields: ['current_password', 'new_password']
        }
      ];

      return PasswordForm;

    }