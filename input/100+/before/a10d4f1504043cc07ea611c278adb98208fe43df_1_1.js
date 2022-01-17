function () {
      var toolRoot = this.get('toolRoot'),
          annotationName = toolRoot.get('annotationName'),
          annotation = Smartgraphs.graphingTool.getAnnotation(annotationName),
          datadefName = toolRoot.get('datadefName'),
          datadef = Smartgraphs.graphingTool.getDatadef(datadefName);

      if (!annotation) {
        throw SC.Error.desc("Graphing tool was started with a bogus annotation name '%@'".fmt(annotationName));
      }
      if (!SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {
        throw SC.Error.desc("Graphing tool was started with a non-FreehandSketch annotation name '%@'".fmt(annotationName));
      }
      if (!datadef) {
        throw SC.Error.desc("Graphing tool was started with a bogus datadef name '%@'".fmt(datadefName));
      }

      Smartgraphs.graphingTool.hideGraphTitle(this);
      Smartgraphs.graphingTool.graphingStarting(this);

      toolRoot.set('annotation', annotation);
      toolRoot.set('datadef', datadef);
      Smartgraphs.graphingTool.appendSketch(this, annotation);
      Smartgraphs.graphingTool.appendRepresentation(this, datadef);
    }