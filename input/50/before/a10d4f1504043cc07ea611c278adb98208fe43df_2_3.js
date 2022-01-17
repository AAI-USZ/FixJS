function (state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    return graphView.graphCanvasView._getLogicalBounds();
  }