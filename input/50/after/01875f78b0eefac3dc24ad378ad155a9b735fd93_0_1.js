function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  var  config = require('./config');
  // start db
  db = mongoskin.db(config.db);
}