function (stackNumber) {
      var stack = players[myPlayerNumber].stacks[stackNumber];
      if (!getMyHand()) {
        setMyHand(stack.pop());
        // IF the stack is now empty, remove it from the player's stacks
        if (stack.length === 0) {
          players[myPlayerNumber].stacks.splice(stackNumber, 1);
          console.log("Emptied stack");
          console.log(players[myPlayerNumber].stacks);
        }
      }
    }