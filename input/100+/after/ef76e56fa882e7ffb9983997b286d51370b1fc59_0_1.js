function() {
  var Game,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.GameView = {
    initialize: function() {
      this.enable_sorting();
      return this.enable_events();
    },
    enable_sorting: function() {
      $("#player-box").sortable({
        change: function() {
          return GameController.reposition(GameView.get_arrangement());
        }
      });
      return $("#player-box").disableSelection();
    },
    enable_events: function() {
      $(".player").click(function() {
        return GameController.score(GameView.get_name_from_elt(this));
      });
      $("#undo").click(function() {
        return GameController.undo_score();
      });
      return $("#submit-game").click(function() {
        return GameController.send_results();
      });
    },
    get_arrangement: function() {
      var players;
      players = $('.player .name').map(function(i, elt) {
        return elt.innerText;
      });
      return [[players[1], players[0]], [players[2], players[3]]];
    },
    get_name_from_elt: function(elt) {
      return $(elt).find('.name').text();
    },
    set_scores: function(scores, totalScores) {
      $(".black .score .value").text(scores[0]);
      $(".yellow .score .value").text(scores[1]);
      $(".black .total .value").text(totalScores[0]);
      return $(".yellow .total .value").text(totalScores[1]);
    },
    set_game_num: function(num) {
      return $("#game .value").text(num);
    }
  };

  this.GameController = {
    server_url: "",
    match: [],
    current_game: null,
    total_scores: [0, 0],
    initialize: function(opts) {
      this.new_game(GameView.get_arrangement());
      return this.server_url = opts.server_url;
    },
    new_game: function(players) {
      this.current_game = new Game(players);
      this.match.push(this.current_game);
      return this.refresh_scores();
    },
    score: function(player) {
      this.current_game.add_goal(player);
      if (this.current_game.is_game_over()) {
        this.new_game(this.current_game.arrangement);
      }
      return this.refresh_scores();
    },
    undo_score: function() {
      if (this.current_game.is_empty() && this.match.length > 1) {
        this.match.pop();
        this.current_game = this.match[this.match.length - 1];
      }
      this.current_game.undo_goal();
      return this.refresh_scores();
    },
    refresh_scores: function() {
      var add_arrays, scores;
      add_arrays = function(prevVal, val) {
        return [prevVal[0] + val[0], prevVal[1] + val[1]];
      };
      scores = this.match.map(function(game) {
        return game.scores;
      });
      this.total_scores = scores.reduce(add_arrays, [0, 0]);
      GameView.set_scores(this.current_game.scores, this.total_scores);
      return GameView.set_game_num(this.match.length);
    },
    reposition: function(new_arrangement) {
      return this.current_game.reposition(new_arrangement);
    },
    send_results: function() {
      return $.post(this.server_url, this.match);
    }
  };

  Game = (function() {

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

  })();

}