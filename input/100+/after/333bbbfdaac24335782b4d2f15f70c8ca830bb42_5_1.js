function GridStore(db, id, filename, mode, options) {
  if(!(this instanceof GridStore)) return new GridStore(db, id, filename, mode, options);

  var self = this;
  this.db = db;  
  var _filename = filename;

  if(typeof filename == 'string' && typeof mode == 'string') {
    _filename = filename;  
  } else if(typeof filename == 'string' && typeof mode == 'object' && mode != null) {
    var _mode = mode;
    mode = filename;
    options = _mode;    
    _filename = id;
  } else if(typeof filename == 'string' && mode == null) {
    mode = filename;
    _filename = id;
  }
  
  // set grid referencetype
  this.referenceBy = typeof id == 'string' ? 0 : 1;
  this.filename = _filename;
  this.fileId = typeof id == 'string' ? new ObjectID() : id;
  
  // Set up the rest
  this.mode = mode == null ? "r" : mode;
  this.options = options == null ? {} : options;
  this.root = this.options['root'] == null ? exports.GridStore.DEFAULT_ROOT_COLLECTION : this.options['root'];
  this.position = 0;
  // Set default chunk size
  this.internalChunkSize = this.options['chunkSize'] == null ? Chunk.DEFAULT_CHUNK_SIZE : this.options['chunkSize'];  
  // Previous chunk size
  this.previousChunkSize = 0;
}