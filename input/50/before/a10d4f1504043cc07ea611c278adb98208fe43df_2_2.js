function (state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    graphView.get('titleView').set('isVisible', true);
  }