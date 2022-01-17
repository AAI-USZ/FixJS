function(player) {
      var goal, scoring_team;
      goal = {
        time: new Date(),
        scorer: player,
        arrangement: this.current_game.arrangement
      };
      this.current_game.goals.push(goal);
      scoring_team = (__indexOf.call(this.current_game.arrangement[0], player) >= 0 ? 0 : 1);
      this.current_game.scores[scoring_team]++;
      this.total_scores[scoring_team]++;
      if (this.current_game.scores[0] === this.score_limit || this.current_game.scores[1] === this.score_limit) {
        this.match.push(this.current_game);
        this.new_game(this.current_game.arrangement);
      }
      return this.refresh_scores();
    }