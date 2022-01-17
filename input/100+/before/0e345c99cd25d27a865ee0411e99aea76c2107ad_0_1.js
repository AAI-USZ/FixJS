function appendTurnToLog(turn) {
            player = ui.players[turn.player];
            $('#log')
                .append(DIV({ 'class': 'moveScore' },
                            DIV({ 'class': 'score' },
                                SPAN({ 'class': 'playerName' }, player.name),
                                SPAN({ 'class': 'score' }, turn.move.score)),
                            turn.move.words.map(function (word) {
                                return DIV({ 'class': 'wordScore' },
                                           SPAN({ 'class': 'word' }, word.word),
                                           SPAN({ 'class': 'score' }, word.score))
                            })))
                .animate({ scrollTop: $('#log').prop('scrollHeight') }, 1000);
        }