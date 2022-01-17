function (data) {
  console.log(data);
  var $leaderboard = $('#leaderboard'),
      players = data.result;
      html = "";
  var excluded = [],
      underTwo = [],
      bestFive = [];

  players.sort(sortByTime);
  console.log(players);
  $.each(players, function (index, player) {
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
  });

  excluded.sort(sortByTime);
  underTwo.sort(sortByTime);
  bestFive.sort(sortByTime);
  console.log(excluded);
  console.log(underTwo);
  console.log(bestFive);

  html += "<span>Ausser Wertung:</span><ul>";
  $.each(excluded, function (index, player) {
    if(data.player && (data.player.fbid == player.fbid)) {
      html += "<li class='new_record' style='color: #F6358A'>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    } else {
      html += "<li>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    }
  });
  html += "</ul>";

  html += "<span>Unter 2 Minuten*:</span><ul>";
  $.each(underTwo, function (index, player) {
    if(data.player && (data.player.fbid == player.fbid)) {
      html += "<li class='new_record' style='color: #F6358A'>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    } else {
      html += "<li>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    }
  });
  html += "</ul>";

  html += "<span>Beste 5 über 2 Minuten*:</span><ul>";
  $.each(bestFive, function (index, player) {
    if(data.player && (data.player.fbid == player.fbid)) {
      html += "<li class='new_record' style='color: #F6358A'>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    } else {
      html += "<li>"+(index+1)+". "+player.name+": <span class='time'>"+formatTime(player.time)+"</span></li>";
    }
  });
  html += "</ul><span>*Eintritt+1 frei</span>";

  $leaderboard.html(html);

  $('.new_record').animate({ color: "#000000" }, 5000, function () {
    $('.new_record').removeClass('new_record');
  });
}