function() {
      $("#player-box").sortable({
        change: function() {
          return GameController.reposition(GameView.get_arrangement());
        }
      });
      return $("#player-box").disableSelection();
    }