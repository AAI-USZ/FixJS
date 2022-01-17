function () {
  'use strict';
  var stub = new wwwhisper.Stub();
  stub.setErrorHandler({
    cleanError: function() {},

    handleError: function(message, status) {
      if (status === 401) {
        $('#not-authenticated').removeClass('hidden');
      } else {
        // Other error.
        $('body').html(message);
      }
    }
  });

  // Make sure a user is authenticated.
  stub.ajax('GET', '/auth/api/whoami/', null,
            function(result) {
              stub.setErrorHandler(null);
              // Logged in.
              $('#email').text(result.email);
              $('#authenticated').removeClass('hidden');
              $('#logout').click(function() {
                // TODO: change this to display goodbye message from the server.
                stub.ajax('POST', '/auth/api/logout/', {}, function() {
                  $('#authenticated').addClass('hidden');
                  $('#logged-out').removeClass('hidden');
                });
                return false;
              });
            });

}