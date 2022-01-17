function (index, player) {
    var playerFixed = player;

    console.log(player.name + ": " + formatTime(player.time));

    if(player.fbid === "100002146898225") {
      playerFixed.name = "Gunther Affe";
      excluded.push(playerFixed);
      console.log("excluded");
      console.log("---------");
    } else if (player.fbid === "100000529285495") {
      playerFixed.name = "Bassador";
      excluded.push(playerFixed);
      console.log("excluded");
      console.log("---------");
    } else if (player.fbid === "1099911102") {
      playerFixed.name = "tsnm";
      excluded.push(playerFixed);
      console.log("excluded");
      console.log("---------");
    } else if (player.fbid === "100000015080286") {
      playerFixed.name = "ELEKTROLOK";
      excluded.push(playerFixed);
      console.log("excluded");
      console.log("---------");
    } else if(player.time < 120) {
      underTwo.push(player);
      console.log("underTwo");
      console.log("---------");
    } else {
      if(bestFive.length < 5) {
        bestFive.push(player);
        console.log("bestFive");
        console.log("---------");
      }
      console.log("not in");
      console.log("---------");
    }
  }