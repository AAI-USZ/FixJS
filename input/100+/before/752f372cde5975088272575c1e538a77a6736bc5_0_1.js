function add_games(section, games) {
    section.find(".games_list").html('');
    if (games.length !== 0) {
      for (i in games) {
        var game_data = games[i];
        
        var players_string = "<span style=\"color:#ccc\">Empty</span>";
        if (game_data.players.length > 0) {
          players_string = game_data.players.join(", ");
        }

        var game_type = "Unknown game type";
        if (game_data.type === "3tau") {
          game_type = "3 Tau";
        } else if (game_data.type === "6tau") {
          game_type = "6 Tau";
        } else if (game_data.type === "g3tau") {
          game_type = "Generalized 3 Tau";
        } else if (game_data.type == "i3tau") {
          game_type = "Insane 3 Tau";
        } else if (game_data.type == "e3tau") {
          game_type = "Easy 3 Tau";
        } else if (game_data.type == "4tau") {
          game_type = "4 Tau";
        } else if (game_data.type == "3ptau") {
          game_type = "3 Projective Tau";
        } else if (game_data.type == "z3tau") {
          game_type = "Puzzle 3 Tau";
        }

        section.find(".games_list").append($("<li><a href=\"/game/" + game_data.id + "\">Game " + game_data.id + "</a> (" + game_type + ") - " + players_string + "</li>"));
      }
      section.show();
    } else {
      section.hide();
    }
  }