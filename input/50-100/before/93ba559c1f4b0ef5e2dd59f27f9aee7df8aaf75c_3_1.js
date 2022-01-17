function (x, y, state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: x, pageY: y });
    var logicalPoint = graphView.pointForCoordinates(coords.x, coords.y);
    return graphView.graphCanvasView._checkInputAreaScreenBounds(x, y);
  }