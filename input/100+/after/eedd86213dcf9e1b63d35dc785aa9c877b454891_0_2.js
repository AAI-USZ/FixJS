function ($scope, game) {
  console.log(game);
  $scope.gameState = game;
  
  // Remove - start a new game
  game.newGame(4);
  
  // Test method. TODO: delete
  $scope.testDeal = function (playerNumber, stackNumber) {
    // console.log($scope.gameState)
    if (!$scope.gameState.getNumberOfStacks(playerNumber)) {
      $scope.gameState.addStack(playerNumber);
      $scope.$apply();
    }
    animateDeal({ kind: "hit" }, playerNumber, stackNumber, 0.25, function (card, playerNumber, stackNumber) {
      $scope.gameState.dealCard(card, playerNumber, stackNumber);
      $scope.$apply();
    });
    console.log($scope.gameState.getStacks(playerNumber));
  };

}