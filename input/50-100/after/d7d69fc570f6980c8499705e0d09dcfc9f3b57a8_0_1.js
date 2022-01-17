function createMappingIfNotPresent(client, indexName, typeName, schema, cb){
  generator.generateMapping(schema, function(err, mapping){
    var completeMapping = {};
    completeMapping[typeName] = mapping;
    client.createIndex(indexName, {mappings:completeMapping},cb);
  });
}