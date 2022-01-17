function (x, y) {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    return graphView.graphCanvasView._checkInputAreaScreenBounds(x, y);
  }