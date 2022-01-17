function () {
    Photos.remove({});
    console.log("Server startup")
    // code to run on server at startup
    if(Photos.find().count() == 0) {
      Meteor.call("callAPIs");
    }
  }