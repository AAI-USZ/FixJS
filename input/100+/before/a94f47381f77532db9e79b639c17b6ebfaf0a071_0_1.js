function(event) {
            var letter = String.fromCharCode(event.charCode).toUpperCase();
            if (ui.cursor && ui.legalLetters.indexOf(letter) != -1) {
                var rackSquare = ui.rack.findLetterSquare(letter, true);
                if (rackSquare) {
                    if (rackSquare.tile.isBlank()) {
                        rackSquare.tile.letter = letter;
                    }
                    ui.keyboardPlacements.push([rackSquare, ui.cursor.square]);
                    ui.moveTile(rackSquare, ui.cursor.square);
                    var newCursorSquare;
                    if (ui.cursor.direction == 'horizontal') {
                        for (var x = ui.cursor.square.x; x < 15; x++) {
                            var boardSquare = ui.board.squares[x][ui.cursor.square.y];
                            if (!boardSquare.tile) {
                                newCursorSquare = boardSquare;
                                break;
                            }
                        }
                    } else {
                        for (var y = ui.cursor.square.y; y < 15; y++) {
                            var boardSquare = ui.board.squares[ui.cursor.square.x][y];
                            if (!boardSquare.tile) {
                                newCursorSquare = boardSquare;
                                break;
                            }
                        }
                    }
                    if (newCursorSquare) {
                        ui.setCursor(newCursorSquare);
                    } else {
                        ui.deleteCursor();
                    }
                }
            }
        }