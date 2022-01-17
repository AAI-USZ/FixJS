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

  /**
   * Returns the current chunksize of the file.
   * 
   * @field chunkSize
   * @type {Number}
   * @getter
   * @setter
   * @property return number of bytes in the current chunkSize.
   */
  Object.defineProperty(this, "chunkSize", { enumerable: true
   , get: function () {
       return this.internalChunkSize;
     }
   , set: function(value) {
       if(!(this.mode[0] == "w" && this.position == 0 && this.uploadDate == null)) {
         this.internalChunkSize = this.internalChunkSize;
       } else {
         this.internalChunkSize = value;
       }
     }
  });

  /**
   * The md5 checksum for this file.
   * 
   * @field md5
   * @type {Number}
   * @getter
   * @setter
   * @property return this files md5 checksum.
   */
  Object.defineProperty(this, "md5", { enumerable: true
   , get: function () {
       return this.internalMd5;
     }
  });
}