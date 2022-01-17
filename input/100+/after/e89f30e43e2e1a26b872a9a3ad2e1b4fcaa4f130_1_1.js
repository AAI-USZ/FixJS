function() {
    var player1 = 1;
    var card1 = 5;
    var player2 = 2;
    var player_id = player1;
    var game_id = 101;

    var game = {
        'id': game_id,
        'owner': true,
        'owner_id': player1,
        'ready': true,
        'winner_card': 10,
        'players': [ { 'id': player1, 'vote': null, 'win': 'n', 'picked': card1, 'cards': [], 'score': null, 'level': null, 'score_next': null, 'score_left': null },
                     { 'id': player2, 'vote': null, 'win': 'n', 'picked': null, 'cards': [], 'score': null, 'level': null, 'score_next': null, 'score_left': null } ],
        'invited': [ player2 ]
    };

    var element = $('#qunit-fixture .cardstories_invitation .cardstories_owner');
    var invite_button = $('.cardstories_player_invite', element).first();
    var advertise_dialog = $('.cardstories_advertise', element);

    $.cardstories.poll_ignore = function(_request) {};
    $.cardstories.ajax = function(options) {};

    ok(!element.hasClass('cardstories_active'));
    $.cardstories.invitation(player_id, game, $('#qunit-fixture .cardstories'));
    ok(element.hasClass('cardstories_active'));
    ok($('.cardstories_advertise_close', advertise_dialog).hasClass('cardstories_button_disabled'), 'cannot close dialog with only 2 players');
}