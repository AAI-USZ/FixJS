function createMappingIfNotPresent(indexName, typeName, schema, cb){
  generator.generateMapping(schema, function(err, mapping){
    var completeMapping = {};
    completeMapping[typeName] = mapping;
    esClient.createIndex(indexName, {mappings:completeMapping},cb);
  });
}