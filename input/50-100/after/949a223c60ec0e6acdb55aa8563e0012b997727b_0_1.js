function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.session({secret: 'dadaism'}));
  app.set('port', 3000);
}