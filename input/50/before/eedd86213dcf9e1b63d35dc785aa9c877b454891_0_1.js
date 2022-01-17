function (card, playerNumber, stackNumber) {
      $gameCtrl.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    }