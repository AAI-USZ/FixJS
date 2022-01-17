function() {
          var view = this;
          var newEmail = $('#newUserEmail')[0].value;
          var newPass = $('#newUserPassword')[0].value;

          this.model = new User.Model({
            email: newEmail,
            password: newPass
          });
          console.log('Saving new: ' + JSON.stringify(this.model));
          this.model.save({}, {success: function(model, response){
              namespace.app.router.navigate("/", true);
              namespace.app.user.set({
                email: newEmail,
                password: newPass
              });
              $("#loginanchor").detach();
              namespace.app.trigger('login:submit');
          }});

      }