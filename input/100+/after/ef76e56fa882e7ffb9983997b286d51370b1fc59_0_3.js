function() {

    Game.prototype.score_limit = 5;

    function Game(arrangement) {
      this.goals = [];
      this.arrangement = arrangement;
      this.scores = [0, 0];
    }

    Game.prototype.get_team_from_player = function(player) {
      if (__indexOf.call(this.arrangement[0], player) >= 0) {
        return 0;
      } else {
        return 1;
      }
    };

    Game.prototype.is_empty = function() {
      return this.scores[0] === 0 && this.scores[1] === 0;
    };

    Game.prototype.is_game_over = function() {
      return this.scores[0] >= this.score_limit || this.scores[1] >= this.score_limit;
    };

    Game.prototype.add_goal = function(player) {
      var goal;
      goal = {
        time: new Date(),
        scorer: player,
        arrangement: this.arrangement
      };
      this.goals.push(goal);
      return this.scores[this.get_team_from_player(player)]++;
    };

    Game.prototype.undo_goal = function() {
      var goal;
      if (goal = this.goals.pop()) {
        return this.scores[this.get_team_from_player(goal.scorer)]--;
      }
    };

    Game.prototype.reposition = function(arrangement) {
      this.arrangement = arrangement;
    };

    return Game;

  }