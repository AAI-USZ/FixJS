function () {
        /**
         * Draws the scoreboard
         */

        'use strict';

        var sb = $('#scoreboard'),
            key,
            html = '<ul>',
            ngbtn,
            base_url = window.location.host,
            qrcode_src,
            short_url,
            our_url,
            img;

        if (sb.length === 0) {
            ngbtn = document.createElement('button');
            ngbtn = $(ngbtn);
            ngbtn.attr('id', 'newgame').click(function() { GAME.newGame(); });
            ngbtn.text('New Game');

            sb = document.createElement('div');
            sb = $(sb);
            sb.attr('id', 'scoreboard');

            qrcode_src = "https://chart.googleapis.com/chart?" +
                "cht=qr&chs=250x250&chl=" + our_url;

            img = document.createElement('img');
            img = $(img);
            img.attr('src', qrcode_src);

            $(Crafty.stage.elem).before(img);
            $(Crafty.stage.elem).before(ngbtn);
            $(Crafty.stage.elem).before(sb);
        }

        for (key in GAME.players) {
            if (GAME.players.hasOwnProperty(key)) {
                html += '<li id="' + GAME.players[key].id + '">' + 
                    GAME.players[key].colour + ': <span>' +
                    GAME.players[key].score + '</span></li>';
            }
        }
        html += '</ul>';
        sb.html(html);
    }