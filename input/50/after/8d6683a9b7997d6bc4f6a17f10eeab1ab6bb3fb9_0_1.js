function(placement) {
                        var square = ui.board.squares[placement.x][placement.y];
                        tilesTakenBack.unshift(square.tile);
                        square.placeTile(null);
                    }