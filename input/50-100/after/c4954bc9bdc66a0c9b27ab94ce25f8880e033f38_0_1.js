function () {
        
        var model = this.model;
        
        model.getBoard().forEachPosition(function (value, row, column, index) {
            var core = model.getPiece(row, column),
                color = model.getSimulatedPiece(row, column);
            
            this.pieces[index].update(color, core);
        }, this);
    }