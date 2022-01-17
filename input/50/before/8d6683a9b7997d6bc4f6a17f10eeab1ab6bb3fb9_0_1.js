function(placement) {
                        var square = ui.board.squares[placement.x][placement.y];
                        tilesTakenBack.push(square.tile);
                        square.placeTile(null);
                    }