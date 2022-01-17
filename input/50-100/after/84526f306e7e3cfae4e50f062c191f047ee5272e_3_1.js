function(result) {
              var email;
              email = result.email;
              if (email.length > MAX_EMAIL_LENGTH) {
                // Trim very long emails so 'sign out' button fits in
                // the iframe.
                email = email.substr(0, MAX_EMAIL_LENGTH) + '[...]';
              }
              $('#email').text(email);
              $('#wwwhisper-overlay').removeClass('hidden');
            }