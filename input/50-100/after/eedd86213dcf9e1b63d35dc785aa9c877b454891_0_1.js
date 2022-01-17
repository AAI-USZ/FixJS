function (card, playerNumber, stackNumber) {
    var $gameCtrl = angular.element($("#app")).scope();
    $gameCtrl.gameState.dealCard(card, playerNumber, stackNumber);
    $gameCtrl.$apply();

    // then deal another
    animateDeal({ name: "poof", kind: "HIT" }, 0, 0, 1, function (card, playerNumber, stackNumber) {
      $gameCtrl.gameState.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    });
  }