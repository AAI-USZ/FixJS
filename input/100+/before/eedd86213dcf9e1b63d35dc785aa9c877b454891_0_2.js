function ($scope, game) {
  console.log(game)
  $scope.gameState = game;
  
  // Test method. TODO: delete
  $scope.testDeal = function (playerNumber, stackNumber) {
    console.log(playerNumber);
    console.log(stackNumber);
    // console.log($scope.gameState)
    if (!$scope.gameState.getNumberOfStacks(playerNumber)) {
      $scope.gameState.addStack(playerNumber);
      $scope.$apply();
    }
    animateDeal({ kind: "HIT" }, playerNumber, stackNumber, 0.25, function (card, playerNumber, stackNumber) {
      var $gameCtrl = angular.element($("#app")).scope();
      $gameCtrl.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    });
    console.log($scope.gameState.getStacks(playerNumber));
  };

}