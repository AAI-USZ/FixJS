function() {
    // make sure we are called from the correct scope.
    // this will make our property references below clearer.
    if (this !== SC.AutoResizeManager) {
      return SC.AutoResizeManager.doBatchResize();
    }

    var tag, views, view, layer, batches, prepared;

    // first measure all the batched views
    batches = this.viewsNeedingResize;
    for(tag in batches) {
      if (batches.hasOwnProperty(tag)) {
        views = batches[tag];

        // now measure the rest using the same settings
        while ((view = views.pop())) {
          if(view.get('isVisibleInWindow') && (layer = view.get('autoResizeLayer'))) {
            if(!prepared) SC.prepareStringMeasurement(layer);

            view.measureSize(YES);
          }
        }

        // if they were all isVisible:NO, then prepare was never called
        // so dont call teardown
        if(prepared) SC.teardownStringMeasurement();
      }
    }

    // measure views with no batch id
    views = this.untaggedViews;

    if(!views) {
      return;
    }

    while((view = views.pop())) {
      view.measureSize();
    }
  }