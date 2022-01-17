function (card, playerNumber, stackNumber) {
    var $gameCtrl = angular.element($("#app")).scope();
    $gameCtrl.dealCard(card, playerNumber, stackNumber);
    $gameCtrl.$apply();

    // then deal another
    animateDeal({ name: "poof", kind: "HIT" }, 0, 0, 1, function (card, playerNumber, stackNumber) {
      $gameCtrl.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    });
  }