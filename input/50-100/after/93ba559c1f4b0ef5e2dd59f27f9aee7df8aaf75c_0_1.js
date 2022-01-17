function (dataRepresentation, x, y) {
    if (Smartgraphs.statechart && Smartgraphs.statechart.get('statechartIsInitialized')) {
      Smartgraphs.statechart.sendAction('dataPointDown', this, { dataRepresentation: dataRepresentation,  x: x, y: y });
    }
    this.sendAction('dataPointDown', this, { dataRepresentation: dataRepresentation,  x: x, y: y  });
  }