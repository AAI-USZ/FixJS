function(socket, opts) {
  if (socket.id in this.clients) {
    return;
  }
  
  // If the same facebook user is logging in, we need a hack to refresh this user.
  if (opts["facebookId"] in this.facebookIds) {
    var client = this.clients[socket.id];
    var player = this.facebookIds[opts["facebookId"]];
    delete this.world.players[player.id];
    delete this.clients[socket.id];
  }
  
  // Make a new player.
  var playerId = this.nextPlayerId++;
  socket.playerId = playerId;
  var player = new Player();
  player.name = opts["name"];
  player.facebookId = opts["facebookId"];
  player.id = playerId;
  player.monitor = new Monitor(player)
    .track("article.name")
    .track("article.id")
    .track("facebookId") 
    .track("name")
  
  // Add the client to the dictionary.
  this.clients[socket.id] = socket;
  this.world.players[playerId] = player;
  this.facebookIds[player.facebookId] = player;
  
  // Broadcast the data to the existing clients.
  var playerData = this.getPlayers();
  for (var id in this.clients) {
    this.clients[id].emit('players', playerData);
  }
}