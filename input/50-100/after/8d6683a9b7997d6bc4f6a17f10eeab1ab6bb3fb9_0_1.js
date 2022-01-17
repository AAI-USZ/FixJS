function(square) {
                            if (square.tile && lettersToReturn.contains(square.tile.letter)) {
                                lettersToReturn.remove(square.tile.letter);
                                square.placeTile(null);
                                square.placeTile(tilesTakenBack.pop());
                            }
                        }