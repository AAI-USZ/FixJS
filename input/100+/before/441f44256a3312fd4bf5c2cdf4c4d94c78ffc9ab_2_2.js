function(name) {
    $.getJSON('/api/service?method=room.get&room='+name, function(resp) {
      var room = resp.data;
      $("#teams").html("<b>Current Room:</b> "+room.name);
      if (room) {
        if (room.game.partial) {
          $("#question").html(room.game.partial+" ");
        }
        var teams = room.teams;
        for (var i in teams){
          (function(teams, i) {
            var team = $("<div></div>");
            team.html("<u>Team "+i+"</u>");
            $("#teams").append(team);
            if (!room.game.started) {
              if (teams[i].players.length < room.properties.teamLimit) {
                var but = $("<button>Join</button>");
                $(but).click(function(){ 
                  window.handler.sit(i);
                });
                team.append(but);
              }
            }
            for (var player in teams[i].players) {
              $.getJSON('/api/service?method=user.get&user='+teams[i].players[player], function(resp) {
                var response = resp.data;
                team.append($("<div>"+response.name+"</div>"));
              });
            }
          })(teams, i);
        }
      }
    });
  }