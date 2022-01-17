function (index, player) {
    var playerFixed = player;

    if(player.fbid === "100002146898225") {
      playerFixed.name = "Gunther Affe";
      excluded.push(playerFixed);
    } else if (player.fbid === "100000529285495") {
      playerFixed.name = "Bassador";
      excluded.push(playerFixed);
    } else if (player.fbid === "1099911102") {
      playerFixed.name = "tsnm";
      excluded.push(playerFixed);
    } else if (player.fbid === "100000015080286") {
      playerFixed.name = "ELEKTROLOK";
      excluded.push(playerFixed);
    } else if(player.time < 120) {
      underTwo.push(player);
    } else {
      if(bestFive.length < 5) {
        bestFive.push(player);
      }
    }
  }