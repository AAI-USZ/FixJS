function (args) {
    var graphController = this.graphControllerForPane(args.pane);
    var otherPane = this.otherPaneFor(args.pane);
    var tableController = this.tableControllerForPane(otherPane);
    tableController.setRoundingFunc('Fixed');
    graphController.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
    this.set('annotationName', args.annotationName);
    this.set('datadefName', args.data);
  }