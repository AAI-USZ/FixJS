function(e) {
    var uDb = e.target.result;

    if(!uDb.objectStoreNames.contains(gazel.osName)) {
      uDb.createObjectStore(gazel.osName);
    }

    if(!uDb.objectStoreNames.contains(gazel.setsOsName)) {
      var setsOs = uDb.createObjectStore(gazel.setsOsName);
      setsOs.createIndex("key", "key", { unique: false });
    }

    if(onupgrade)
      onupgrade(uDb);
  }