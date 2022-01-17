function(id, max, room) {
        var team = this;
        this.players = [];
        var buzzed = false;
        this.getBuzzed = function() {
          return buzzed;
        }
        this.setBuzzed = function(b) {
          buzzed = b;
        }
        this.unsit = function(user, callback) {
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
        this.sit = function(user, callback) {
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
        this.contains = function(user) {
          if (team.players.indexOf(user) != -1) {
            return true;
          } else {
            return false;
          }
        }
        this.getId = function(callback){
          if (callback) {
            callback(id);
          }
          return id;
        }
        this.getPlayers = function(callback) {
          if (callback) {
            callback(this.players);
          }
          return this.players;
        }
      }