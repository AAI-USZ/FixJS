function(err, user) {
      if (user != null)
        return promise.fulfill(user);
      var user = new User({
        _id: id,
        name: fbUserMetadata.name,
      });
      user.save(function(err) {
        if (err) return promise.fail(err);
        promise.fulfill(user);
      });
    }