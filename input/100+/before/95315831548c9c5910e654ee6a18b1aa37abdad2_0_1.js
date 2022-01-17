function(fromSquare, toSquare) {
    var tile = fromSquare.tile;
    var ui = this;
    fromSquare.placeTile(null);
    fromSquare.owner.tileCount--;
    if (tile.isBlank() && !tile.letter) {
        if (fromSquare.owner != this.board && toSquare.owner == this.board) {
            $('#blankLetterRequester button')
                .on('keypress', function (event) {
                    var letter = String.fromCharCode(event.charCode);
                    if (letter != '') {
                        letter = letter.toUpperCase();
                        if (ui.legalLetters.indexOf(letter) != -1) {
                            $(this).off('keypress');
                            tile.letter = letter;
                            $.unblockUI();
                            ui.updateSquare(toSquare);
                            $('#dummyInput').focus();
                        }
                    }
                });
            $.blockUI({ message: $('#blankLetterRequester') });
        } else if (toSquare.owner == ui.rack || toSquare.owner == ui.swapRack) {
            tile.letter = ' ';
        }
    }
    toSquare.placeTile(tile);
    toSquare.owner.tileCount++;
    if (!this.boardLocked()) {
        setTimeout(function () { ui.updateGameStatus() }, 100);
    }
}