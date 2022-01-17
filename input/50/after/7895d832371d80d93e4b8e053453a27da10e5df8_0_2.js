function(error, db) {
    console.log('connected to db');

    db.addListener("error", function (error) {
      console.log("Error connecting to MongoHQ");
    });

    db_defer.resolve(db);
  }