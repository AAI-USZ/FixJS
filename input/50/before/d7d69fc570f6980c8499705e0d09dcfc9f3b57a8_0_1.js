function(cb){
    setIndexNameIfUnset(this.modelName);
    createMappingIfNotPresent(indexName, typeName, schema, cb);
  }