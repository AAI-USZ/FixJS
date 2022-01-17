function(err, docs) {
    if (err) {
      console.log("Error using users/_design/docs/_view/passwordId:");
      console.log(err);
      promise.fail(err);
      return;
    }
    /*
     * If the user is found in the couch view, dont add it
     */
    if (docs.length > 0) {
      var user = docs[0].value;
      console.log('user exists: ' + util.inspect(user));
      promise.fulfill(user);//TODO find out what this does
    } else {
      var u = new Backbone.Model({
        username: userData.screen_name,
        name: userData.name,
        password : userData.password, //TODO hash the password with the server's key
        email: userData.email,
        userData: userData
      });
      console.log(util.inspect(u));
      
      var doc = u.toJSON();
      c.database('users').save(doc, function(err, res) {
        if (err) {
          console.log("Error using users:");
          console.log(err);
          promise.fail(err);
          return;
        }
        console.log('User created: ' + util.inspect(doc));
        promise.fulfill(doc);
      });
    }
  }