function displayNextGameMessage(nextGameKey) {
            if (nextGameKey) {
                $('#log')
                    .append(DIV({ 'class': 'nextGame' },
                                A({ href: '/game/' + nextGameKey + '/' + $.cookie(ui.gameKey)}, "next game")));
                $('#makeNextGame').remove();
            } else {
                var makeNextGameButton = BUTTON(null, "Make new game");
                $(makeNextGameButton)
                    .on('click', function() {
                        ui.sendMoveToServer('newGame', null);
                    });
                $('#log')
                    .append(DIV({ 'id': 'makeNextGame' },
                                'Click ', makeNextGameButton, ' if you want to play the same language and opponents again'));
            }
        }