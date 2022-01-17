function (playerNumber) {
      var rider = players[playerNumber].rider;
      
      // Special condition for skip - just remove one extra
      if (rider.card.kind === "skip" && rider.extras) {
        rider.extras -= 1;
      } else {
        rider.card = null;
        rider.extras = 0;
      }
    }