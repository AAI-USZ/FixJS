function(newUserAttrs) {
      console.log("In registerUser" + util.inspect(newUserAttrs));
      var login = newUserAttrs[this.loginKey()];
      //TODO add the user to the database
      var promise = this.Promise();
      console.log("Successfully made a promise now calling function");
      findOrCreateByPasswordData(newUserAttrs, promise);
//      return promise; //TODO findout what this is and wheter we want to use addUser
      console.log("here were the userids " + util.inspect(usersById))
      return usersByLogin[login] = addUser(newUserAttrs);
    }