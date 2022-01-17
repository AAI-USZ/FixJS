function(done) {
    var self = this

    sequelize.getQueryInterface()
      .dropAllTables()
      .success(function() {
        sequelize.daoFactoryManager.daos = []
        done()
      })
      .error(function(err) { console.log(err) })
  }