function() {
    temporaryDatabase = utils.createTemporaryDatabase();
    database = temporaryDatabase.get();
    server = utils.setupServer(database);
  }