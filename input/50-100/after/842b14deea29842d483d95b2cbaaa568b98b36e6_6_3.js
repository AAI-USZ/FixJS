function launchBattle(userID1, userID2) {

  // Initialize battle state object
  var question = Questions[~~(Math.random() * Questions.length)];
  var battle = new Battle(userID1, userID2, question);

  [userID1, userID2].forEach(function(userID) {
    app.userIDToBattle[userID] = battle;
    var socket = app.userIDToSocket[userID];
    socket.emit('battle');
  });
}