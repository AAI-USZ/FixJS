function(file, mongoObject) {
  if(!(this instanceof Chunk)) return new Chunk(file, mongoObject);
  
  this.file = file;
  var self = this;
  var mongoObjectFinal = mongoObject == null ? {} : mongoObject;

  this.objectId = mongoObjectFinal._id == null ? new ObjectID() : mongoObjectFinal._id;
  this.chunkNumber = mongoObjectFinal.n == null ? 0 : mongoObjectFinal.n;
  this.data = new Binary();

  if(mongoObjectFinal.data == null) {
  } else if(typeof mongoObjectFinal.data == "string") {
    var buffer = new Buffer(mongoObjectFinal.data.length);
    buffer.write(mongoObjectFinal.data, 'binary', 0);
    this.data = new Binary(buffer);
  } else if(Array.isArray(mongoObjectFinal.data)) {
    var buffer = new Buffer(mongoObjectFinal.data.length);
    buffer.write(mongoObjectFinal.data.join(''), 'binary', 0);
    this.data = new Binary(buffer);
  } else if(mongoObjectFinal.data instanceof Binary || Object.prototype.toString.call(mongoObjectFinal.data) == "[object Binary]") {    
    this.data = mongoObjectFinal.data;
  } else if(Buffer.isBuffer(mongoObjectFinal.data)) {
  } else {
    throw Error("Illegal chunk format");
  }
  // Update position
  this.internalPosition = 0;

  /**
   * The position of the read/write head
   * @name position
   * @lends Chunk#
   * @field
   */
  Object.defineProperty(this, "position", { enumerable: true
    , get: function () {
        return this.internalPosition;
      }
    , set: function(value) {
        this.internalPosition = value;
      }
  });  
}