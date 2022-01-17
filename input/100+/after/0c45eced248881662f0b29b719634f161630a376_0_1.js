function() {
      return $scope.game && $scope.game.myTurn ? 'You' : 'They';
    }