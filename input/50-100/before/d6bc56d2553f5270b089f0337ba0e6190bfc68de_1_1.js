function(error, result) {
        if (error) {
          Meteor.default_connection.setUserId(null);
          localStorage.setItem("Meteor.loginToken", "");
          Meteor._debug("Server error on login", error);
          return;
        }
      }