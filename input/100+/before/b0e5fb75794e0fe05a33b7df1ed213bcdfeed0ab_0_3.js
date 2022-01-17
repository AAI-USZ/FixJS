function extractview(item) {
    var bag = {};
    if (item.properties && Utilities.isArray(item.properties)) {
      item.properties
      .filter(function (el) { return el.direction === 'output' })
      .forEach(function (prop) {
        bag[prop.identifier] = prop.value;
      });
    }
    return bag;
  }