function() {
          var email, password, username;
          username = $('input#name').val();
          email = $('input#email').val();
          password = $('input#password').val();
          console.log("registering in on login form...");
          fimo.data.post('register', {
            email: email,
            username: username,
            password: password
          }, function(res) {
            window.localStorage.setItem('user', JSON.stringify({
              email: email,
              password: password,
              userId: res.userId
            }));
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        }