function(recordType, hash, psk, path) {
    var store = this.get('store'), id, sk, pk, cr = null;

    hash = hash || {}; // init if needed

    if (SC.none(store)) throw 'Error: during the creation of a child record: NO STORE ON PARENT!';

    // Check for a primary key in the child record hash and if not found, then
    // check for a custom id generation function and if we still have no id,
    // generate a unique (and re-createable) id based on the parent's
    // storeKey.  Having the generated id be re-createable is important so
    // that we don't keep making new storeKeys for the same child record each
    // time that it is reloaded.
    id = hash[recordType.prototype.primaryKey];
    if (!id) this.generateIdForChild(cr);
    if (!id) { id = psk + '.' + path; }

    // If there is an id, there may also be a storeKey.  If so, update the
    // hash for the child record in the store and materialize it.  If not,
    // then create the child record.
    sk = store.storeKeyExists(recordType, id);
    if (sk) {
      store.writeDataHash(sk, hash);
      cr = store.materializeRecord(sk);
    } else {
      cr = store.createRecord(recordType, hash, id);
    }

    return cr;
  }