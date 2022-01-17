function(div)
        {
            player_div = JQuery('<div id="player"></div>');
            $('#currently-playing').after(player_div)
            init_player(null);
        }