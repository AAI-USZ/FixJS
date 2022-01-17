function(e) {
    console.log('Creating or upgrading media database');

    var db = openRequest.result;

    // If there are already existing object stores, delete them all
    // If the version number changes we just want to start over.
    var existingStoreNames = db.objectStoreNames;
    for (var i = 0; i < existingStoreNames.length; i++) {
      db.deleteObjectStore(existingStoreNames);
    }

    // Now build the database
    var filestore = db.createObjectStore('files', { keyPath: 'name' });
    mediadb.indexes.forEach(function(indexName)  {
      // the index name is also the keypath
      filestore.createIndex(indexName, indexName);
    });
  }