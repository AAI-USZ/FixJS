function (event) {
    
    var hoverPosition = this.hoverPosition;
    
    if (hoverPosition) {
        var model = this.model;
        model.move(hoverPosition.row, hoverPosition.column, model.getTurn());
    }
}