function() {
    var root = $('#qunit-fixture .cardstories');
    var owner_id = 15;
    var game_id = 100;
    var element = $('#qunit-fixture .cardstories_invitation .cardstories_owner');
    var invite_button = $('.cardstories_player_invite:first', element);
    var advertise_dialog = $('.cardstories_advertise', element);
    var copy_url = $('.cardstories_copy_url', advertise_dialog);

    $.cardstories.close_modal = function(modal, overlay) {
        ok(modal.hasClass('cardstories_advertise'), 'the advertise dialog gets closed');
        start();
    };

    // Set fake location
    var location = $.cardstories.location;
    $.cardstories.location = {protocol: 'http:', host: 'fake.href'};

    $.cardstories.advertise(owner_id, game_id, element, root);
    equal($('.cardstories_copy_url', advertise_dialog).val(), 'http://fake.href/?game_id=100');

    // Reset fake location
    $.cardstories.location = location;
    
    // Close the dialog.
    $('.cardstories_advertise_close', advertise_dialog).removeClass('cardstories_button_disabled');
    $('.cardstories_advertise_close', advertise_dialog).click();
}