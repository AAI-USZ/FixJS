  get supportsPrinting() {
    var canvas = document.createElement('canvas');
    var value = 'mozPrintCallback' in canvas;
    // shadow
    Object.defineProperty(this, 'supportsPrinting', { value: value,
                                                      enumerable: true,
                                                      configurable: true,
                                                      writable: false });
    return value;
  },
