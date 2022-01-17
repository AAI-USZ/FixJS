function() {
      var goal, scoring_team, _ref;
      if (goal = this.current_game.goals.pop()) {
        scoring_team = ((_ref = goal.scorer, __indexOf.call(this.current_game.arrangement[0], _ref) >= 0) ? 0 : 1);
        this.current_game.scores[scoring_team]--;
        this.total_scores[scoring_team]--;
        return this.refresh_scores();
      }
    }