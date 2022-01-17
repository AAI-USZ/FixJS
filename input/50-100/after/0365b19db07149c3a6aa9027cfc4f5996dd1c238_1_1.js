function() {

    function Game() {}

    Game.debugPrint = false;

    Game.debugStep = false;

    Game.log = function(message) {
      if (!Game.debugPrint) {
        return;
      }
      return console.log(message);
    };

    return Game;

  }