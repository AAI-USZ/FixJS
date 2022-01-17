function () {
      this.get('owner').hideControls();
      
      var graphingTool = Smartgraphs.graphingTool;
      graphingTool.set('pointMovedNumber', null);
      graphingTool.set('pointMoved', false);
      graphingTool.graphingFinished(this);
      graphingTool.set('lineCount', 0);
      
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
      toolRoot.set('datadef', null);
      toolRoot.set('datadefName', null);
    }