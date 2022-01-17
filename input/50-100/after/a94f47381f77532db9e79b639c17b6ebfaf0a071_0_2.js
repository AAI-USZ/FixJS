function(square, direction) {
    if (ui.cursor) {
        var oldCursorSquare = ui.cursor.square;
        ui.cursor.square = square;
        ui.updateBoardSquare(oldCursorSquare);
    } else {
        ui.cursor = { square: square,
                      direction: (direction || 'horizontal') };
    }
    ui.updateBoardSquare(square);
}