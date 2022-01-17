function () {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    this.set('graphLogicalBounds', graphView.graphCanvasView._getLogicalBounds());
  }