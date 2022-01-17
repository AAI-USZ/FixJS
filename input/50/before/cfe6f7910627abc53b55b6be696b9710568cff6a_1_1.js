function() {
    if (popup.closed) {
      clearInterval(checkPopupOpen);

      // Hit our OAuth endpoint to cancel this login request so that
      // the app doesn't hang
      Meteor.http.get(Meteor.accounts.facebook._appUrl +
                      '/_oauth/facebook/?error=error&state=' + oauthState,
                      function() {});
    }
  }