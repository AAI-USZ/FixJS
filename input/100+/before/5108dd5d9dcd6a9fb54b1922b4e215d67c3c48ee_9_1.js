function() {
          console.log("registering in on login form...");
          fimo.data.post('register', {
            email: $('input#email').val(),
            username: $('input#name').val(),
            password: $('input#password').val()
          }, function() {
            window.localStorage.setItem('user', JSON.stringify({
              email: $('input#email').val(),
              password: $('input#password').val()
            }));
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        }