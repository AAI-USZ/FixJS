function (event) {
        var x = event.offsetX === undefined ? event.layerX : event.offsetX,
            y = event.offsetY === undefined ? event.layerY : event.offsetY,
            oldHoverPosition = this.hoverPosition,
            newHoverPosition = this.hoverPosition = this.getPositionFromXY(x, y),
            model = this.model;
        
        if (oldHoverPosition
                && oldHoverPosition.row    === newHoverPosition.row
                && oldHoverPosition.column === newHoverPosition.column) {
            return;
        }
        
        if (model.isInteractive()) {
            model.simulateMove(newHoverPosition.row, newHoverPosition.column, model.getTurn());
        }
    }