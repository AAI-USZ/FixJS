function onKPIData(msg, result) {
    // currentData will be undefined if sampling is disabled.
    var currentData = this.getCurrent();
    if (currentData) {
      _.extend(currentData, result);
      model.setCurrent(currentData);
    }
  }