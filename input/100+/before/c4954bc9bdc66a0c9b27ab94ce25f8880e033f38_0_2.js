function GameView (canvasSelector, model) {
    
    var self = this;
    var canvasElement = document.querySelector(canvasSelector);
    
    this.canvasElement      = canvasElement;
    this.model              = model;
    this.pieces             = [];
    this.redrawingPieceList = [];
    
    model.getBoard().forEachPosition(function(value, row, column, index) {
        this.pieces[index] = new GameView.Piece(this, row, column);
    }, this);
    
    this.drawBackground();
    
    canvasElement.addEventListener('click', function (event) {
        self.onClick(event);
    }, false);
    
    canvasElement.addEventListener('mousemove', function (event) {
        self.onMouseMove(event);
    }, false);
    
    canvasElement.addEventListener('mouseout', function (event) {
        self.onMouseOut(event);
    }, false);
    
    canvasElement.addEventListener('mousein', function (event) {
        self.onMouseMove(event);
    }, false);
    
    model.addEventListener('boardchanged', function (event) {
        self.updateDisplay();
    }, false);
    
    model.addEventListener('simulationchanged', function (event) {
        self.updateDisplay();
    }, false);
    
    model.addEventListener('interactivechanged', function (event) {
        self.onInteractiveChanged(event);
    }, false);
    
    model.addEventListener('gameover', function (event) {
        self.onGameOver(event);
    }, false);
}