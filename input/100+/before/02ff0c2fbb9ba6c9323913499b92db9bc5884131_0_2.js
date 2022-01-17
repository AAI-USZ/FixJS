function() {
    if (this.board.tileCount > 0) {
        this.setMoveAction('commitMove', 'Make move');
        var move = calculateMove(this.board.squares);
        $('#move').empty();
        if (move.error) {
            $('#move')
                .append(move.error);
            $('#turnButton').attr('disabled', 'disabled');
        } else {
            $('#move')
                .append(DIV(null, "score: " + move.score));
            move.words.forEach(function (word) {
                $('#move')
                    .append(DIV(null, word.word + " " + word.score));
            });
            $('#turnButton').removeAttr('disabled');
        }
        $('#swapRack').css('display', 'none');
    } else if (this.swapRack.tileCount > 0) {
        this.setMoveAction('swapTiles', 'Swap tiles');
        $('#board .ui-droppable').droppable('disable');
        $('#turnButton').removeAttr('disabled');
    } else {
        this.setMoveAction('pass', 'Pass');
        $('#board .ui-droppable').droppable('enable');
        $('#swapRack').css('display', 'block');
        $('#turnButton').removeAttr('disabled');
    }
}