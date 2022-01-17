function(players) {
      this.current_game = {
        goals: [],
        arrangement: players,
        scores: [0, 0]
      };
      return GameView.set_game_num(this.match.length + 1);
    }