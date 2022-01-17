function(result) {
              stub.setErrorHandler(null);
              // Logged in.
              $('#email').text(result.email)
              $('#authenticated').removeClass('hidden');
              $('#logout').click(function() {
                // TODO: change this to display goodbye message from the server.
                stub.ajax('POST', '/auth/api/logout/', {}, function(message) {
                  $('#authenticated').addClass('hidden');
                  $('#logged-out').removeClass('hidden');
                });
                return false;
              });
            }