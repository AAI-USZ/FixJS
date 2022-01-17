function (entityType, callback) {
  var self = this
    , generator;
    
  if (!self.entityGenerators[entityType]) {
    // First time generating this entity, create a placeholder document before fetching it from the server.
    self.entityGenerators[entityType] = { lastId: 0, currentMax: 0 };
  }

  // Increment our current then validate against the max
  generator = self.entityGenerators[entityType];
  generator.lastId += 1;

  if (generator.lastId > generator.currentMax) {
    generator.getMaxInProgress = true;
    generator.getMaxDone = false;
    // We have exceeded the currently assigned limit, get a new limit
    self._getNextMax(entityType, function (error) {
      if (error) { return callback && callback(error); }
      generator.lastId += 1;
      generator.getMaxInProgress = false;
      generator.getMaxDone = true;
      return callback && callback(undefined, generator.lastId);
    });
  } else {
    // We are still in range, so just send it back
    return callback && callback(undefined, generator.lastId);
  }
}