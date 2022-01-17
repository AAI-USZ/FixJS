function(player, letters) {
    var game = this;

    if (game.letterBag.remainingTileCount() < 7) {
        throw 'cannot swap, letterbag contains only ' + game.letterBag.remainingTileCount() + ' tiles';
    }
    game.passes++;
    var rackLetters = new scrabble.Bag(player.rack.letters());
    letters.forEach(function (letter) {
        if (rackLetters.contains(letter)) {
            rackLetters.remove(letter);
        } else {
            throw 'cannot swap, rack does not contain letter "' + letter + '"';
        }
    });

    // The swap is legal.  First get new tiles, then return the old ones to the letter bag
    var newTiles = game.letterBag.getRandomTiles(letters.length);
    var lettersReturned = new scrabble.Bag(letters);
    game.letterBag.returnTiles(_.reduce(player.rack.squares,
                                        function(accu, square) {
                                            if (square.tile && lettersReturned.contains(square.tile.letter)) {
                                                lettersReturned.remove(square.tile.letter);
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