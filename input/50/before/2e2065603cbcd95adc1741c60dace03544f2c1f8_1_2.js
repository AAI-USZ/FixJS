function() {
        equal($('.cardstories_next_game_author', next_game_dom).css('display'), 'block');
        equal($('.cardstories_next_game_player', next_game_dom).css('display'), 'none');
        continue_button.click();
        start();
    }