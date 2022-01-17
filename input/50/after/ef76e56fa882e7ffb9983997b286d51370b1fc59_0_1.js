function(players) {
      this.current_game = new Game(players);
      this.match.push(this.current_game);
      return this.refresh_scores();
    }