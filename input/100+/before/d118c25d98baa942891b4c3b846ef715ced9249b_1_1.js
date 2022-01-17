function(password) {
      if (password.length > 0) {
        this.model.save({password : password}, {
          success : _.bind(function() {
            dc.ui.notifier.show({
              text      : 'Password updated',
              duration  : 5000,
              mode      : 'info'
            });
          }, this)
        });
        return true;
      } else {
        dc.ui.Dialog.alert("Your password can't be blank");
      };
    }, this), {password : true, mode : 'short_prompt'}