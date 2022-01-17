function() {
        equal($('.cardstories_next_game_author', next_game_dom).css('display'), 'none');
        equal($('.cardstories_next_game_player', next_game_dom).css('display'), 'block');
        continue_button.click();
    }