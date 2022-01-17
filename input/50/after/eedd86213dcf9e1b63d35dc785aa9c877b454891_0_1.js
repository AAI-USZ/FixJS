function (card, playerNumber, stackNumber) {
      $gameCtrl.gameState.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    }