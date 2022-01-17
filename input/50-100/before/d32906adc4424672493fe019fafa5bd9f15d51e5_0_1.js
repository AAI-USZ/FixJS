  get supportsPrinting() {
    var canvas = document.createElement('canvas');
    return 'mozPrintCallback' in canvas;
  },
