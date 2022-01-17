function (gameData, err) {
        gameData = thaw(gameData, PrototypeMap);
        console.log('gameData', gameData);

        ui.board = gameData.board;
        ui.players = gameData.players;
        var playerNumber = 0;
        $('#scoreboard')
            .append(TABLE(null,
                          gameData.players.map(function(player) {
                              if (player.rack) {
                                  ui.rack = player.rack;
                                  ui.boardLocked(playerNumber != gameData.whosTurn);
                                  ui.playerNumber = playerNumber;
                              }
                              playerNumber++;
                              return TR(null,
                                        TD({ 'class': 'name' }, player.rack ? "You" : player.name),
                                        player.scoreElement = TD({ 'class': 'score' }, player.score));
                          })));

        ui.drawBoard();
        ui.drawRack();

        function scrollLogToEnd() {
            $('#log').animate({ scrollTop: $('#log').prop('scrollHeight') }, 1000);
        }

        function appendTurnToLog(turn, suppressScroll) {
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
                            })));
        }

        function processTurnScore(turn) {
            player = ui.players[turn.player];
            player.score += turn.move.score;
            $(player.scoreElement).text(player.score);
        }

        function placeTurnTiles(turn) {
            for (var i in turn.placements) {
                var placement = turn.placements[i];
                ui.board.squares[placement.x][placement.y].placeTile(new Tile(placement.letter, placement.score), true);
            }
        }

        function displayWhosTurn(playerNumber) {
            if (playerNumber == ui.playerNumber) {
                $('#whosturn').empty().text("Your turn");
            } else {
                console.log('playerNumber', playerNumber, 'players', ui.players);
                var name = ui.players[playerNumber].name;
                $('#whosturn').empty().text(name + "'" + ((name.charAt(name.length - 1) == 's') ? '' : 's') + " turn");
            }
        }

        gameData.turns.map(appendTurnToLog);
        scrollLogToEnd();

        displayWhosTurn(gameData.whosTurn);

        ui.socket = io.connect();
        ui.socket.emit('join', { gameKey: ui.gameKey });
        ui.socket.on('join', function (data) {
            console.log('join', data);
        });
        ui.socket.on('leave', function (data) {
            console.log('leave', data.command);
        });
        ui.socket.on('turn', function (turn) {
            console.log('turn', turn);
            appendTurnToLog(turn);
            scrollLogToEnd();
            processTurnScore(turn);
            // If this has been a move by another player, place tiles on board
            if (turn.player != ui.playerNumber) {
                placeTurnTiles(turn);
            }
            if (turn.whosTurn == ui.playerNumber) {
                ui.playAudio("yourturn");
                ui.boardLocked(false);
            }
            displayWhosTurn(turn.whosTurn);
        });

        function uiCall(f) {
            return function() {
                var args = Array.prototype.slice.call(arguments);
                args.shift();                                   // remove event
                f.apply(ui, args);
            }
        }

        $(document)
            .bind('SquareChanged', uiCall(ui.updateSquare))
            .bind('Refresh', uiCall(ui.refresh))
            .bind('RefreshRack', uiCall(ui.refreshRack))
            .bind('RefreshBoard', uiCall(ui.refreshBoard));

        ['CommitMove', 'Shuffle'].forEach(function (action) {
            var button = BUTTON({ id: action }, action)
            $(button).bind('click', uiCall(ui[action]));
            $('#buttons').append(button);
        });
    }