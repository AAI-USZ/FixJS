function () {
  'use strict';
  var stub = new wwwhisper.Stub(), MAX_EMAIL_LENGTH = 30;
  stub.setErrorHandler({
    cleanError: function() {},

    /**
     * User is not authenticated or some other error occurred. Remove
     * the overlay iframe. Keeping overlay hidden is not enough,
     * because all content below the iframe does not receive user's
     * input (e.g. links are non-clickable).
     */
    handleError: function() {
      $('#wwwhisper-iframe', window.parent.document).remove();
    }
  });

  /**
   * Checks if a user is authenticates and if so, shows an overlay
   * with the user's email and 'sign-out' button.
   */
  stub.ajax('GET', '/auth/api/whoami/', null,
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
            });
}