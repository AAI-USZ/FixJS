function() {
      $("#box").sortable({
        change: function() {
          return GameController.reposition(GameView.get_arrangement());
        }
      });
      return $("#box").disableSelection();
    }