function (playerNumber) {
    var rider = $scope.gameState.players[playerNumber].rider;
    var card = $scope.getMyHand();
    
    if (!rider.card && card.kind !== "extra") {
      rider.card = card;
      setMyHand(null)
    } else if (rider.card && card.kind === "extra") {
      rider.extras += 1;
      setMyHand(null)
    }
    $scope.$apply();
  }