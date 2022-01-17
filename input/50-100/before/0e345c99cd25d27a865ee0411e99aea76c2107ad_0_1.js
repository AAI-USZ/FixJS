function (turn) {
            console.log('turn', turn);
            appendTurnToLog(turn);
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
        }