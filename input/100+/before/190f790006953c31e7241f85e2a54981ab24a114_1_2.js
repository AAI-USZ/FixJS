function(recordType, hash) {
    var sk, id, cr = null, existingId = null,
      store = this.get('store'), pk = recordType.prototype.primaryKey;

    if (SC.none(store)) throw 'Error during child record creation: No store on parent.';
    if (SC.empty(pk))  throw 'Error during child record creation: No primary key on child.';

    SC.run(function() {
      hash = hash || {};
      id = hash[pk];
      sk = id ? store.storeKeyExists(recordType, id) : null;

      if (sk) {
        store.writeDataHash(sk, hash);
        cr = store.materializeRecord(sk);
      } else {
        cr = store.createRecord(recordType, hash);
        if (SC.empty(id)) this.generateIdForChild(cr);
      }

    }, this);
    
    return cr;
  }