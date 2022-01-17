function(error, result) {
    if (error) {
      Meteor._debug("Server error on login", error);
      return;
    }

    localStorage.setItem("Meteor.loginToken", result.token);
    Meteor.default_connection.setUserId(result.id);
    Meteor.default_connection.onReconnect = function() {
      Meteor.apply('login', [{resume: result.token}], {wait: true}, function(error, result) {
        if (error) {
          Meteor.default_connection.setUserId(null);
          localStorage.setItem("Meteor.loginToken", "");
          Meteor._debug("Server error on login", error);
          return;
        }
      });
    };
    if (typeof callback === 'function')
      callback();
  }