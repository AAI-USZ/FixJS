function(err, mapping){
    var completeMapping = {};
    completeMapping[typeName] = mapping;
    client.createIndex(indexName, {mappings:completeMapping},cb);
  }