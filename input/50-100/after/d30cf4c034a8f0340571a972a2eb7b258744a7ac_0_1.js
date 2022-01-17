function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('view options', { pretty: true });
  db = require('mongoskin').db('localhost:27017/friends');
}