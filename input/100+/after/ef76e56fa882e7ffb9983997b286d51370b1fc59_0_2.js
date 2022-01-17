function() {
      if (this.current_game.is_empty() && this.match.length > 1) {
        this.match.pop();
        this.current_game = this.match[this.match.length - 1];
      }
      this.current_game.undo_goal();
      return this.refresh_scores();
    }