function (event) {
    var x = event.offsetX == undefined ? event.layerX : event.offsetX;
    var y = event.offsetY == undefined ? event.layerY : event.offsetY; 
    var oldHoverPosition = this.hoverPosition;
    var newHoverPosition = this.hoverPosition = this.getPositionFromXY(x, y);
    var model = this.model;
    
    if (oldHoverPosition
            && oldHoverPosition.row    == newHoverPosition.row
            && oldHoverPosition.column == newHoverPosition.column) {
        return;
    }
    
    if (model.isInteractive()) {
        model.simulateMove(newHoverPosition.row, newHoverPosition.column, model.getTurn());
    }
}