function(message, status) {
          if (status === 403) {
            // Login failed because the user is unknown.
            $('#sign-in').addClass('hidden');
            $('#nothing-shared').removeClass('hidden');
          } else {
            // Other error.
            $('body').html(message);
          }
        }