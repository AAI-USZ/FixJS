function (queryTuple, queryMotifRegistry) {
    var meta = this.lookup(queryTuple)
      , memoryQuery = meta.query;
    if (memoryQuery) return memoryQuery;

    var queryJson = queryMotifRegistry.queryJSON(queryTuple);
    if (! queryJson.type) queryJson.type = 'find';
    return meta.query = new MemoryQuery(queryJson);
  }