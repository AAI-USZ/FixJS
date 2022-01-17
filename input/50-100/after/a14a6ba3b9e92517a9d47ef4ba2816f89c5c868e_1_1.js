function(accu, square) {
                                            if (square.tile && lettersReturned.contains(square.tile.letter)) {
                                                lettersReturned.remove(square.tile.letter);
                                                accu.push(square.tile);
                                                square.placeTile(null);
                                            }
                                            return accu;
                                        }