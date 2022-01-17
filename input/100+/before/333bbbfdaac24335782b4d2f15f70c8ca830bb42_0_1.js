function Collection (db, collectionName, pkFactory, options) {
  if(!(this instanceof Collection)) return new Collection(db, collectionName, pkFactory, options);
  
  checkCollectionName(collectionName);

  this.db = db;
  this.collectionName = collectionName;
  this.internalHint = null;
  this.opts = options != null && ('object' === typeof options) ? options : {};
  this.slaveOk = options == null || options.slaveOk == null ? db.slaveOk : options.slaveOk;
  this.serializeFunctions = options == null || options.serializeFunctions == null ? db.serializeFunctions : options.serializeFunctions;
  this.raw = options == null || options.raw == null ? db.raw : options.raw;
  this.pkFactory = pkFactory == null
    ? ObjectID
    : pkFactory;
    
  var self = this;
  Object.defineProperty(this, "hint", {
      enumerable: true
    , get: function () {
        return this.internalHint;
      }
    , set: function (v) {
        this.internalHint = normalizeHintField(v);
      }
  });
}