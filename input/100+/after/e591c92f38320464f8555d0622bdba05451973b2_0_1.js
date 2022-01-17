function(item) {

                    var turn = parseTurn(item);

                    makeTurn(turn);

                    findAdjacentRows(turn);

                    return turn;

                }