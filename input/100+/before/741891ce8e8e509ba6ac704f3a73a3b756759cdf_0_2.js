function (Socket, GameState) {

  Socket.onopen = function () {
    console.log("Connected to server");
    Socket.send("data");
  };

  Socket.onmessage = function (message) {
    // console.log(message);
    if (message.action === 'deal') {
      animateDeal(message.card, message.player, message.stack, 0.5, function (card, playerNumber, stackNumber) {
        GameState.dealCard(card, playerNumber, stackNumber);
      });
    }
  };

  Socket.onerror = function (err) {
    console.log("ERROR");
    console.log(err);
  };
}