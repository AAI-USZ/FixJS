function (args) {
    var controller = this.graphControllerForPane(args.pane);
    controller.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
    this.set('annotationName', args.annotationName);
    this.set('datadefName', args.data);
  }