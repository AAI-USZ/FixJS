function(recordType, hash, psk, path) {
    var store = this.get('store'), id, sk, cr;

    // We can't create a nested record without a store (not having one would be very strange).
    if (SC.none(store)) throw 'Error: during the creation of a child record: NO STORE ON PARENT!';

    // Initialize the hash if needed.
    hash = hash || {};

    // Check for an ID on the hash.
    id = hash[recordType.prototype.primaryKey];

    // Check to see if there's already a store key for the child record (by ID).
    sk = recordType.storeKeyExists(id);

    // If not, check to see if we can get the store key with the path.
    if (SC.empty(sk)) sk = store.nestedStoreKeyForPath(psk, path);

    if (!SC.empty(sk)) {
      // If we found a store key, simply replace the data hash and materialize.
      store.writeDataHash(sk, hash);
      cr = store.materializeRecord(sk);
    } else {
      // If not, create a new nested record and assign an ID if necessary.
      cr = store.createRecord(recordType, hash);
      if (SC.empty(id)) this.generateIdForChild(cr);
    }

    return cr;
  }