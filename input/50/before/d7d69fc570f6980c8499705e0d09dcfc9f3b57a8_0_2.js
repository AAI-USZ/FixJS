function(err, mapping){
    var completeMapping = {};
    completeMapping[typeName] = mapping;
    esClient.createIndex(indexName, {mappings:completeMapping},cb);
  }