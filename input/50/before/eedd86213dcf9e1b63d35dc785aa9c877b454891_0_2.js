function (card, playerNumber, stackNumber) {
      var $gameCtrl = angular.element($("#app")).scope();
      $gameCtrl.dealCard(card, playerNumber, stackNumber);
      $gameCtrl.$apply();
    }