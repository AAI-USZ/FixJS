function(recordType, hash) {
    var store, id, sk, pk, cr = null, existingId = null;
    SC.run(function() {
      hash = hash || {}; // init if needed

      existingId = hash[recordType.prototype.primaryKey];

      store = this.get('store');
      if (SC.none(store)) throw 'Error: during the creation of a child record: NO STORE ON PARENT!';

      if (!id && (pk = recordType.prototype.primaryKey)) {
        id = hash[pk];
        // In case there is not a primary key supplied then we create on
        // on the fly
        sk = id ? store.storeKeyExists(recordType, id) : null;
        if (sk){
          store.writeDataHash(sk, hash);
          cr = store.materializeRecord(sk);
        } else {
          cr = store.createRecord(recordType, hash) ;
          if (SC.none(id)){
            sk = cr.get('storeKey');
            id = 'cr'+sk;
            SC.Store.replaceIdFor(sk, id);
            hash = store.readEditableDataHash(sk);
            hash[pk] = id;
          }
        }

      }

      // ID processing if necessary
      if (SC.none(existingId) && this.generateIdForChild) this.generateIdForChild(cr);

    }, this);

    return cr;
  }