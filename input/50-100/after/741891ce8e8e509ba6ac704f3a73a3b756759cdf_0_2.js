function (playerNumber, stackNumber) {
      // Only allow pickup from the player's own stacks
      // TODO: move this into the view, since it really should be
      // conditional ng-click binding and not handled here
      if (playerNumber === myPlayerNumber) {
        var stack = players[myPlayerNumber].stacks[stackNumber];
        if (!getMyHand()) {
          setMyHand(stack.pop());
        }
      }
    }