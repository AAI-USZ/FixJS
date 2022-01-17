function (req, socket, head) {
  var self = this;

  if (! this.checkRequest(req)) {
    return this;
  }

  // attach the legacy `head` property to request
  req.head = head;

  var client = this.createClient(req);

  client.on('open', function() {
    if (self.options.clientTracking) {
      var i = null;
      if (self.clientsNull.length) {
        i = self.clientsNull.shift();
        self.clients[i] = client;
      }
      else {
        i = self.clients.length;
        self.clients.push(client);
      }
      self.clientsCount++;
      client.on('close', function () {
        self.clients[i] = null;
        self.clientsNull.push(i);
        self.clientsCount--;
      });
    }
    self.emit('connection', client);
  });

  return this;
}