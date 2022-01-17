function(accu, square) {
                                            if (square.tile
                                                && _.find(lettersTaken,
                                                          function(letter) {
                                                              return letter == square.tile.letter;
                                                          })) {
                                                lettersTaken = _.without(lettersTaken, square.tile.letter);
                                                accu.push(square.tile);
                                                square.placeTile(null);
                                            }
                                            return accu;
                                        }