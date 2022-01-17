function(user, callback) {
          if (!room.game.started) {
            if (team.players.length < max) {
              if (!this.contains(user)){
                if (room.getUserToTeam()[user]) {
                  room.getTeams()[room.getUserToTeam()[user]].unsit(user);
                }
                room.getUserToTeam()[user] = id;
                team.players.push(user);
                if (callback) {
                  callback(true);
                }
                return true;
              }
            }
          }
          if (callback) {
            callback(false);
          }
          return false;
        }