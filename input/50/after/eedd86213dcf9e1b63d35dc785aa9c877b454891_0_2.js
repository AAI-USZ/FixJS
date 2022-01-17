function (card, playerNumber, stackNumber) {
      $scope.gameState.dealCard(card, playerNumber, stackNumber);
      $scope.$apply();
    }