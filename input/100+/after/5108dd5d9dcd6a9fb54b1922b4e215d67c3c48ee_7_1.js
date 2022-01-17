function() {
          var email, password;
          email = $('input#email').val();
          password = $('input#password').val();
          fimo.data.post('login', {
            email: email,
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