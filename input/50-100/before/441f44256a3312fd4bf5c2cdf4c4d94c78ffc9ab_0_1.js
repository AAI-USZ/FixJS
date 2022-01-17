function(user, callback) {
          if (room.getUserToTeam()[user] == id) {
            team.players.splice(team.players.indexOf(user), 1);
            var ret = delete room.getUserToTeam()[user];
            if (callback) {
              callback(ret);
            } 
            return ret;
          }
          if (callback) {
            callback(false);
          }
          return false;
        }