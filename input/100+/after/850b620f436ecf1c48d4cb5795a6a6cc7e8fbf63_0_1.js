function() {
        var $player, $players_bar, player, players_decks, _$player, _i, _len, _ref, _results;
        $players_bar = $(".two.players");
        switch (current.match.get('players').length) {
          case 3:
            $players_bar = $(".three.players");
            break;
          case 4:
            $players_bar = $(".four.players");
        }
        $players_bar.show();
        $players_bar.find('li').removeClass('turn');
        _ref = current.match.get('players');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          if ($players_bar.find("[data-id*='" + player.id + "']").length < 1) {
            $player = $('#templates').find(".player").clone().attr("data-id", "" + player.id);
            $players_bar.append($player);
            $player.find('.name').html(player.username);
          } else {
            $player = $players_bar.find("[data-id*='" + player.id + "']");
          }
          if (current.match.get('turn') === player.id) {
            $player.addClass('turn');
          }
          if (player.id === current.user.id) {
            _results.push($player.find('.score').html(current.deck.total_points()));
          } else {
            players_decks = new Decks();
            players_decks.url = "" + server_url + "/decks_by_user/" + player.id;
            _$player = $player;
            _results.push(players_decks.fetch({
              success: function() {
                var deck;
                deck = players_decks.where({
                  match_id: current.match.get('id')
                })[0];
                return _$player.find('.score').html(deck.total_points());
              }
            }));
          }
        }
        return _results;
      }