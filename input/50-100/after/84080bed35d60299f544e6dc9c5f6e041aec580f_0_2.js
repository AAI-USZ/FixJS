function DeviceStorageDB(storage, db, options) {
    this.storage = storage;
    this.db = db;
    this.mediaType = options.mediaType;
    this.onchange = options.onchange;
    this.directory = options.directory;
    this.mimeTypes = options.mimeTypes || [];
    this.metadataParser = options.metadataParser;
    this.lastScanTime = null;

    // XXX
    // Register change notification event handlers on the DeviceStorage object.
    // When we get a change, modify the DB, and then call the onchange callback
  }