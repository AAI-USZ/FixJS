function(container, collData, docData) {
      var dispatcher = new Dispatcher();
      var visualizer = new Visualizer(dispatcher, container);
      docData.collection = null;
      dispatcher.post('collectionLoaded', [collData]);
      dispatcher.post('requestRenderData', [docData]);
      return dispatcher;
    }