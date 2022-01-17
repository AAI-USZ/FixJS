function() {
  var self = this;

  self.bayeux = self.createBayeuxServer();
  self.httpServer = self.createHTTPServer();

  self.bayeux.attach(self.httpServer);
  self.httpServer.listen(self.settings.port);
  console.log('Server started on PORT: ' + self.settings.port);
}