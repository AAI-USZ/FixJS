function () {

  // should we show a dropdown rather than a row of buttons
  Template.loginButtons.dropdown = function () {
    var services = Template.loginButtons.services();

    // XXX this might probably change.
    return (_.contains(services, 'password') && services.length > 1)
      || services.length > 2;
  };

  Template.loginButtons.events = {
    'click #login-buttons-Facebook': function () {
      try {
        Meteor.loginWithFacebook();
      } catch (e) {
        if (e instanceof Meteor.accounts.ConfigError)
          alert("Facebook API key not set. Configure app details with "
                + "Meteor.accounts.facebook.config() "
                + "and Meteor.accounts.facebook.setSecret()");
        else
          throw e;
      }
    },

    'click #login-buttons-Google': function () {
      try {
        Meteor.loginWithGoogle();
      } catch (e) {
        if (e instanceof Meteor.accounts.ConfigError)
          alert("Google API key not set. Configure app details with "
                + "Meteor.accounts.google.config() and "
                + "Meteor.accounts.google.setSecret()");
        else
          throw e;
      };
    },

    'click #login-buttons-Weibo': function () {
      try {
        Meteor.loginWithWeibo();
      } catch (e) {
        if (e instanceof Meteor.accounts.ConfigError)
          alert("Weibo API key not set. Configure app details with "
                + "Meteor.accounts.weibo.config() and "
                + "Meteor.accounts.weibo.setSecret()");
        else
          throw e;
      };
    },

    'click #login-buttons-logout': function() {
      Meteor.logout();
    }
  };

  Template.loginButtons.services = function () {
    var ret = [];
    // XXX It would be nice if there were an automated way to read the
    // list of services, such as _.each(Meteor.accounts.services, ...)
    if (Meteor.accounts.facebook)
      ret.push({name: 'Facebook'});
    if (Meteor.accounts.google)
      ret.push({name: 'Google'});
    if (Meteor.accounts.weibo)
      ret.push({name: 'Weibo'});

    return ret;
  };

  // XXX should we instead define a helper function?
  Template.loginButtonsServicesRow.services = Template.loginButtons.services;

  var DROPDOWN_VISIBLE_KEY = 'Meteor.loginButtons.dropdownVisible';

  Template.loginButtonsServicesDropdown.events = {
    'click .login-link-text': function () {
      Session.set(DROPDOWN_VISIBLE_KEY, true);
    },
    'click .login-close-text': function () {
      Session.set(DROPDOWN_VISIBLE_KEY, false);
    }
  };

  Template.loginButtonsServicesDropdown.dropdownVisible = function () {
    return Session.get(DROPDOWN_VISIBLE_KEY);
  };
}