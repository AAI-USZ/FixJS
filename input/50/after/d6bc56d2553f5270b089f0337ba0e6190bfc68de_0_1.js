function () {
    try {
      Meteor.loginWithFacebook();
    } catch (e) {
      if (e instanceof Meteor.accounts.facebook.SetupError)
        alert("You haven't set up your facebook app details. See fb-app.js and server/fb-secret.js");
      else
        throw e;
    }
  }