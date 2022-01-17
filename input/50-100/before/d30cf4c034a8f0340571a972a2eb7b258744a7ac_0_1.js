function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = require('mongoskin').db('localhost:27017/friends');
  app.set('view options', { pretty: true });
}