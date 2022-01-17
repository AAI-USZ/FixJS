function() {
    var player_id = 10;
    var game = {
        id: 7,
        owner: true,
        owner_id: player_id,
        state: 'fake_state',
        winner_card: 15,
        board: [],
        players: [
            {id: player_id, vote: null, win: 'y', picked: 30, cards: [], score: null, level: null, score_next: null, score_left: null}
        ]
    };
    var root = $('#qunit-fixture .cardstories');
    var element = $('.cardstories_complete', root);
    var next_game_dom = $('.cardstories_next_game', element);
    var continue_button = $('.cardstories_play_again', next_game_dom);
    $.cardstories_table = {
        get_next_owner_id: function(player_id, game_id, root) { return player_id; },
        on_next_game_ready: function(ready, player_id, game_id, root, cb) { return true; },
        on_next_owner_change: function(player_id, game_id, root, cb) {}
    };

    $.cardstories.display_modal = function(modal, overlay) {
        ok(false, 'modal should not appear when ready');
    };

    $.cardstories.complete(player_id, game, root).done(function() {
        equal($('.cardstories_next_game_author', next_game_dom).css('display'), 'block');
        equal($('.cardstories_next_game_player', next_game_dom).css('display'), 'none');
        continue_button.click();
        start();
    });
}