function(id, max, room) {
        var team = this;
        var score = {};
        var recalc = true;
        var totalscore = 0;
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
            ret = ret && delete score.user
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
        this.addScore = function(user, points) {
          score[user] += points;
          recalc = true;
        }
        this.getScore = function() {
          var total = 0;
          if (recalc) {
            for (var user in score) {
              total += score[user];
            }
            totalscore = total;
          } else {
            total = totalscore;
          }
          recalc = false;
          return {total: total, players: score};
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
                if (!score[user]) {
                  score[user] = 0;
                }
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