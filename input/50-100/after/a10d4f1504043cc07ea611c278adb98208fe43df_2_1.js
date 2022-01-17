function (x, y) {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: x, pageY: y });
    return graphView.pointForCoordinates(coords.x, coords.y);
  }