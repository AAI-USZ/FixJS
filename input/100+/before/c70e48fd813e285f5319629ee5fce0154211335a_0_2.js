function (gameData, err) {
        gameData = thaw(gameData, PrototypeMap);
        console.log('gameData', gameData);

        ui.swapRack = new Rack(7);
        ui.swapRack.tileCount = 0;
        ui.board = gameData.board;
        ui.board.tileCount = 0;
        ui.legalLetters = gameData.legalLetters;
        ui.players = gameData.players;
        var playerNumber = 0;
        $('#scoreboard')
            .append(TABLE(null,
                          gameData.players.map(function(player) {
                              if (player.rack) {
                                  ui.rack = player.rack;
                                  ui.rack.tileCount = _.reduce(player.rack.squares,
                                                               function(accu, square) {
                                                                   if (square.tile) {
                                                                       accu++;
                                                                   }
                                                                   return accu;
                                                               },
                                                               0);
                                  ui.playerNumber = playerNumber;
                              }
                              playerNumber++;
                              return TR(null,
                                        TD({ 'class': 'name' }, player.rack ? "You" : player.name),
                                        player.scoreElement = TD({ 'class': 'score' }, player.score));
                          })))
            .append(DIV({ id: 'letterbagStatus' }));

        function displayRemainingTileCount(count) {
            if (count > 0) {
                $('#letterbagStatus')
                    .empty()
                    .append(DIV(null, SPAN({ id: 'remainingTileCount' }, count),
                                " remaining tiles"));
            } else {
                $('#letterbagStatus')
                    .empty()
                    .append(DIV(null, "The letterbag is empty"));
            }
            if (count < 7) {
                $('#swapRack')
                    .empty();
            }
        }

        ui.drawBoard();
        if (this.rack) {
            ui.drawRack();
            ui.drawSwapRack();
        }

        displayRemainingTileCount(gameData.remainingTileCount);

        function scrollLogToEnd(speed) {
            $('#log').animate({ scrollTop: $('#log').prop('scrollHeight') }, speed);
        }

        function appendTurnToLog(turn, suppressScroll) {
            player = ui.players[turn.player];
            var div = DIV({ 'class': 'moveScore' },
                          DIV({ 'class': 'score' },
                              SPAN({ 'class': 'playerName' }, player.name),
                              SPAN({ 'class': 'score' }, turn.score)));
            switch (turn.type) {
            case 'move':
                turn.move.words.forEach(function (word) {
                    $(div).append(DIV({ 'class': 'moveDetail' },
                                      SPAN({ 'class': 'word' }, word.word),
                                      SPAN({ 'class': 'score' }, word.score)));
                });
                break;
            case 'pass':
                $(div).append(DIV({ 'class': 'moveDetail' }, "Passed"));
                break;
            case 'swap':
                $(div).append(DIV({ 'class': 'moveDetail' }, "Swapped " + turn.count + " tile" + ((turn.count > 1) ? "s" : "")));
                break;
            default:
                $(div).append(DIV({ 'class': 'moveDetail' }, "unknown move type " + turn.type));
            }
            $('#log').append(div);
        }

        function processMoveScore(turn) {
            player = ui.players[turn.player];
            player.score += turn.score;
            $(player.scoreElement).text(player.score);
        }

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
                                makeNextGameButton));
            }
        }

        function displayEndMessage(endMessage) {
            var winners;
            for (var i in ui.players) {
                var player = ui.players[i];
                var endPlayer = endMessage.players[i];
                player.score = endPlayer.score;
                player.tallyScore = endPlayer.tallyScore;
                player.rack = endPlayer.rack;
                if (player.tallyScore > 0) {
                    $('#log').append(DIV({ 'class': 'gameEndScore' },
                                         player.name + ' gained ' + player.tallyScore + ' points from racks of the other players'));
                } else {
                    $('#log').append(DIV({ 'class': 'gameEndScore' },
                                         player.name + ' lost ' + -player.tallyScore + ' points for his rack containing the letters '
                                         + _.without(player.rack.squares.map(function (square) {
                                             if (square.tile) {
                                                 return square.tile.letter;
                                             }
                                         }), undefined)));
                }
                $(player.scoreElement).text(player.score);
                if (!winners || player.score > winners[0].score) {
                    winners = [ player ];
                } else if (player.score == winners[0].score) {
                    winners.push(player);
                }
            }
            var you = ui.players[ui.playerNumber];
            var youHaveWon = _.contains(winners, you);
            $('#whosturn').empty();
            $('#log')
                .append(DIV({ 'class': 'gameEnded' },
                            'Game has ended, '
                            + joinProse(winners.map(function (player) {
                                return (player == you) ? 'you' : player.name
                            }))
                            + (((winners.length == 1) && !youHaveWon) ? ' has ' : ' have ') + 'won'));
            displayNextGameMessage(endMessage.nextGameKey);
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
                $('#turnControls').css('display', 'block');
            } else if (typeof playerNumber == 'number') {
                var name = ui.players[playerNumber].name;
                $('#whosturn').empty().text(name + "'" + ((name.charAt(name.length - 1) == 's') ? '' : 's') + " turn");
                $('#turnControls').css('display', 'none');
            } else {
                $('#whosturn').empty();
                $('#turnControls').css('display', 'none');
            }
        }

        gameData.turns.map(appendTurnToLog);

        if (gameData.endMessage) {
            displayEndMessage(gameData.endMessage);
        }

        scrollLogToEnd(0);

        displayWhosTurn(gameData.whosTurn);
        ui.boardLocked(ui.playerNumber != gameData.whosTurn);

        ui.socket = io.connect();
        ui.socket
            .on('connect', function(data) {
                console.log('socket connected');
                if (ui.wasConnected) {
                    ui.cancelNotification();
                    window.location = window.location;
                } else {
                    ui.wasConnected = true;
                    ui.socket.emit('join', { gameKey: ui.gameKey });
                }
            })
            .on('disconnect', function(data) {
                console.log('socket disconnect');
                $.blockUI({ message: '<h1>Server unavailable, please wait</h1>' });
            })
            .on('turn', function (turn) {
                console.log('turn', turn);
                appendTurnToLog(turn);
                scrollLogToEnd(300);
                processMoveScore(turn);
                // If this has been a move by another player, place tiles on board
                if (turn.type == 'move' && turn.player != ui.playerNumber) {
                    placeTurnTiles(turn);
                }
                displayRemainingTileCount(turn.remainingTileCount);
                if (turn.whosTurn == ui.playerNumber) {
                    ui.playAudio("yourturn");
                    ui.boardLocked(false);
                }
                if (typeof turn.whosTurn == 'number') {
                    displayWhosTurn(turn.whosTurn);
                    if (turn.whosTurn == ui.playerNumber) {
                        ui.notify('Your turn!', ui.players[turn.player].name + ' has made a move and now it is your turn.');
                    }
                }
                ui.updateGameStatus();
            })
            .on('gameEnded', function (endMessage) {
                endMessage = thaw(endMessage, PrototypeMap);
                displayEndMessage(endMessage);
                ui.notify('Game over!', 'Your game is over...');
            })
            .on('nextGame', function (nextGameKey) {
                displayNextGameMessage(nextGameKey);
            });
        $(document)
            .bind('SquareChanged', ui.eventCallback(ui.updateSquare))
            .bind('Refresh', ui.eventCallback(ui.refresh))
            .bind('RefreshRack', ui.eventCallback(ui.refreshRack))
            .bind('RefreshBoard', ui.eventCallback(ui.refreshBoard));

    }