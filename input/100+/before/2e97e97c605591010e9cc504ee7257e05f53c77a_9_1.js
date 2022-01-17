function MediaDB(mediaType, metadataParser, options) {
  this.mediaType = mediaType;
  this.metadataParser = metadataParser;
  if (!options)
    options = {};
  this.indexes = options.indexes || [];
  this.version = options.version || 1;
  this.directory = options.directory || '';
  this.mimeTypes = options.mimeTypes;
  this.ready = false;

  // Define a dummy metadata parser if we're not given one
  if (!this.metadataParser) {
    this.metadataParser = function(file, callback) {
      setTimeout(function() { callback({}); }, 0);
    }
  }

  var mediadb = this;  // for the nested functions below

  // Set up DeviceStorage
  try {
    this.storage = navigator.getDeviceStorage(mediaType)[0];
  }
  catch (e) {
    console.error("MediaDB(): can't get DeviceStorage object", e);
    return;
  }

  //
  // XXX
  // Register change notification event handlers on the DeviceStorage object.
  // When we get a change, modify the DB, and then call the onchange callback
  // And don't forget to update and persist the lastchangetime, too.
  //

  // Set up IndexedDB
  var indexedDB = window.indexedDB || window.mozIndexedDB;
  this.dbname = 'MediaDB/' + mediaType + '/' + this.directory;
  var openRequest = indexedDB.open(this.dbname, this.version);

  this.lastScanTime =
    parseInt(localStorage.getItem(this.dbname + '.lastScanTime')) || null;

  // This should never happen for Gaia apps
  openRequest.onerror = function(e) {
    console.error('MediaDB():', openRequest.error.name);
  };

  // This should never happen for Gaia apps
  openRequest.onblocked = function(e) {
    console.error('indexedDB.open() is blocked in MediaDB()');
  };

  // This is where we create (or delete and recreate) the database
  openRequest.onupgradeneeded = function(e) {
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

  // This is called when we've got the database open and ready.
  // Call the onready callback
  openRequest.onsuccess = function(e) {
    mediadb.db = openRequest.result;

    // Log any errors that propagate up to here
    mediadb.db.onerror = function(event) {
      console.error('MediaDB: ', event.target.error && event.target.error.name);
    }

    // We're ready now. Call the onready callback function
    mediadb.ready = true;
    if (mediadb.onready)
      mediadb.onready();
  };
}