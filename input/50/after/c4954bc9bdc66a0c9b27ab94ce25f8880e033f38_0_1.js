function (event) {
        
        var hoverPosition = this.hoverPosition,
            model;
        
        if (hoverPosition) {
            model = this.model;
            model.move(hoverPosition.row, hoverPosition.column, model.getTurn());
        }
    }