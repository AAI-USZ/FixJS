function() {
    temporaryDatabase = utils.createTemporaryDatabase();
    database = temporaryDatabase.get();
    utils.loadDumpFile(database, __dirname + '/fixture/companies/ddl.grn');
    utils.loadDumpFile(database, __dirname + '/fixture/companies/data.grn');
    server = utils.setupServer(database);
  }