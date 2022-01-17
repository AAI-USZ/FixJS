function () {
      this.get('owner').hideControls();
      
      Smartgraphs.graphingTool.set('pointMovedNumber', null);
      Smartgraphs.graphingTool.set('pointMoved', false);
      Smartgraphs.graphingTool.graphingFinished(this);
      Smartgraphs.graphingTool.set('lineCount', 0);
      
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
      toolRoot.set('datadef', null);
      toolRoot.set('datadefName', null);
    }