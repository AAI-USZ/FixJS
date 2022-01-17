function(player, letters) {
    var game = this;

    if (game.letterBag.remainingTileCount() < 7) {
        throw 'cannot swap, letterbag contains only ' + game.letterBag.remainingTileCount() + ' tiles';
    }
    game.passes++;
    var rackLetters = player.rack.letters();
    letters.forEach(function (letter) {
        if (_.contains(rackLetters, letter)) {
            rackLetters = _.without(rackLetters, letter);
        } else {
            throw 'cannot swap, rack does not contain letter "' + letter + '"';
        }
    });

    // The swap is legal.  First get new tiles, then return the old ones to the letter bag
    var newTiles = game.letterBag.getRandomTiles(letters.length);
    var lettersTaken = letters.slice();
    game.letterBag.returnTiles(_.reduce(player.rack.squares,
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
                                        },
                                        []));

    var tmpNewTiles = newTiles.slice();
    player.rack.squares.forEach(function(square) {
        if (!square.tile) {
            square.placeTile(tmpNewTiles.pop());
        }
    });

    return [ newTiles,
             { type: 'swap',
               score: 0,
               count: letters.length,
               player: player.index } ];
}