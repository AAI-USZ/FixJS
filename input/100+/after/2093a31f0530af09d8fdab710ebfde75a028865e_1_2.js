function(userToken, callback) {
        var update = function() {
          app.log(app.Constants.Tag.AUTH, [app.getUsers()[userToken].name, "is alive"]);
          if (app.getTimeouts()[userToken]) {
            clearTimeout(app.getTimeouts()[userToken]);
            delete app.getTimeouts()[userToken];
          }
          app.getTimeouts()[userToken] = setTimeout(function() {
            app.log(app.Constants.Tag.AUTH, [app.getUsers()[userToken].name, "is dead"]);
            auth.handler.logout(userToken);
          }, 10000);
          if (callback) {
          }
        }
        if (app.getUsers()[userToken]) {
          update();
        } else { 
          auth.handler.loginWithFb({id:userToken}, function(l) {
            update();
          });
        }
      }