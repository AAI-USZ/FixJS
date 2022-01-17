function(socket) {
  var userID = socket.handshake.session.userID; 
  var battle = app.userIDToBattle[userID];

  // Send the user to the lobby if he isn't in a battle
  if (!battle) {
    socket.emit('redirect', { url: '/lobby' });
    return;
  }

  var players = Object.keys(battle.playerStates);
  var opponentID = players[1 ^ players.indexOf(userID)];

  Users.get(opponentID, this.e(function(opponent) {
    socket.emit('test', {
      opponent: opponent.name
    });
  }));
}