function (x, y, state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    return graphView.graphCanvasView._checkInputAreaScreenBounds(x, y);
  }