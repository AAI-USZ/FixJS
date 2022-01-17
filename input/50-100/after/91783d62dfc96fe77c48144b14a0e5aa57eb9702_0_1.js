function() {
            if (redirectTo) {
              // set the loggedIn status for the site.  This allows us to get
              // a silent assertion without relying on the dialog to set the
              // loggedIn status for the domain.  This is useful when the user
              // closes the dialog OR if redirection happens before the dialog
              // has had a chance to finish its business.
              storage.setLoggedIn(URLParse(redirectTo).originOnly(), email);

              setTimeout(function() {
                doc.location.href = redirectTo;
                complete(oncomplete, verified);
              }, redirectTimeout);
            }
            else {
              complete(oncomplete, verified);
            }
          }