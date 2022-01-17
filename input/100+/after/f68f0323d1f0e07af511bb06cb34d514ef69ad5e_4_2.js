function(model, response){
              namespace.app.router.navigate("/", true);
              namespace.app.user.set({
                email: newEmail,
                password: newPass
              });
              $("#loginanchor").detach();
              namespace.app.trigger('login:submit');
          }