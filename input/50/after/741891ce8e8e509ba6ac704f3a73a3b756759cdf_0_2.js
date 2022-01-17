function (card, playerNumber, stackNumber) {
        GameState.dealCard(card, playerNumber, stackNumber);
        $rootScope.$apply();
      }