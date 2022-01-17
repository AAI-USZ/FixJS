function (err, result) {
    if (err) {
      return callback(err);
    }

    var indexCount = 0;
    var indexes = [];
    var numIndexes = result.length;

    if (numIndexes === 0) {
      return callback(null, []);
    }

    for (var i = 0; i < numIndexes; i++) {
      var indexName = result[i].name;
      this.client.all("pragma index_info(" + indexName + ")", function (err, result) {
        if (err) {
          return callback(err);
        }

        for (var j = 0; j < result.length; j++) {
          var indexMeta = result[j];
          indexMeta.index_name = indexName;
          indexMeta.table_name = tableName;
          indexes.push(new Index(indexMeta));
        }

        if (++indexCount === numIndexes) {
          callback(null, indexes);
        }
      });
    }
  }