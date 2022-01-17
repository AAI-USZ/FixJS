function(error, db) {
    console.log('connected to db ' + mongostr);

    db.addListener("error", function (error) {
      console.log("Error connecting to MongoLab");
    });

    db_defer.resolve(db);
  }