function(socket, opts) {
  if (socket.id in this.clients) {
    return;
  }
  
  // Make a new player.
  var playerId = this.nextPlayerId++;
  socket.playerId = playerId;
  var player = new Player();
  player.name = opts["name"];
  player.facebookId = opts["facebookId"];
  player.monitor = new Monitor(player)
    .track("article.name")
    .track("article.id")
    .track("facebookId") 
    .track("name")
  
  // Add the client to the dictionary.
  this.clients[socket.id] = socket;
  this.world.players[playerId] = player;
  
  // Broadcast the data to the existing clients.
  var playerData = this.getPlayers();
  for (var id in this.clients) {
    this.clients[id].emit('players', playerData);
  }
}