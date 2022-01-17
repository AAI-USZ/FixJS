function onKPIData(msg, result) {
    var currentData = this.getCurrent();
    _.extend(currentData, result);
    model.setCurrent(currentData);
  }