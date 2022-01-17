function (socket, clientId) {
  log.debug("Got new client joining the scope with id: " + this.id);

//  1. Dispatch info about new client to existing ones
  for (var i in this.socketId2Client) {
    var existingClient = this.socketId2Client[i];
//    Tell the user about the new user
    existingClient.socket.emit('newClient',
        {scopeId:this.id, clientId:clientId});
  }

//  2. Store client details
  var client = new Client(clientId, socket);
  this.socketId2Client[socket.id] = client;
  this.clientDetails[clientId] = client;
  this.parts += 1;
}