function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointDragged', this, { dataRepresentation: dataRepresentation,  x: x, y: y });
    }
    this.sendAction('dataPointDragged', this, { dataRepresentation: dataRepresentation,  x: x, y: y  });
  }