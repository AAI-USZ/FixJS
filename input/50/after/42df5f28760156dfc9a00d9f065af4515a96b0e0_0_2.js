function (e) {
    var uDb = e.target.result;

    if(!uDb.objectStoreNames.contains(gazel.osName))
      uDb.createObjectStore(gazel.osName);

    if(onupgrade)
      onupgrade(uDb);
  }