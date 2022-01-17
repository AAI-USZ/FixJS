function(cb){
    setIndexNameIfUnset(this.modelName);
    createMappingIfNotPresent(esClient, indexName, typeName, schema, cb);
  }