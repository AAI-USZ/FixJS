function (x, y, state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: x, pageY: y });
    return graphView.pointForCoordinates(coords.x, coords.y);
  }