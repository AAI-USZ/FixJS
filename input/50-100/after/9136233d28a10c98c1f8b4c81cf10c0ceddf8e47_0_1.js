function() {

  window.Game = (function() {

    function Game() {}

    Game.debug = false;

    Game.log = function(message) {
      if (!Game.debug) {
        return;
      }
      return console.log(message);
    };

    return Game;

  })();

}