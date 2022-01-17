function() {
          fimo.data.post('login', {
            email: $('input#email').val(),
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