function() {
    var test = "Foursquare.Users.getFriends(self)";
    Foursquare.Users.getFriends(null, null, accessToken, function (error, data) {
      if(error) {
        reportError(test, error.message);
      }
      else {
        try {
          logger.trace(sys.inspect(data));
          assert.ok(data.friends);
          assert.ok(data.friends.count >= 0);
          assert.ok(data.friends.items);
          ok(test);
        } catch (error) {
          reportError(test, error);
        }
      }
    });
  }