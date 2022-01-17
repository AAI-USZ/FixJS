function(value, row, column, index) {
        var core = model.getPiece(row, column);
        var color = model.getSimulatedPiece(row, column);
        this.pieces[index].update(color, core);
    }