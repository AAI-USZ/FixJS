function launchBattle(userID1, userID2) {
  // Initialize battle state object
  // Map userIDs to battle state with app.userIDToBattle

  [
    app.userIDToSocket[userID1]
  , app.userIDToSocket[userID2]
  ]
  .forEach(function(socket) {
    socket.emit('battle');
  });
}