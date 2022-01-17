function () {
  app.use(express.static(__dirname + '/webapp'));
  app.use(connectLess({ src: __dirname + '/webapp/' }));
  app.use(express.static(__dirname + '/test'));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}