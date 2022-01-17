function(record, key, value) {
    var sk, store, ret;

    if (record) {
      // Unregister the old child (nested) record.
      if (record.readAttribute(key)) {
        record.unregisterNestedRecord(key);
      } 

      if (SC.none(value)) {
        // Handle null value.
        record.writeAttribute(key, value);
        ret = value;
      } else {
        // Register the nested record with this record (the parent).
        ret = record.registerNestedRecord(value, key);

        if (ret) {
          // Write the data hash of the nested record to the store.
          sk = ret.get('storeKey');
          store = ret.get('store');
          record.writeAttribute(key, store.readDataHash(sk));
        } else if (value) {
          // If registration failed, just write the value.
          record.writeAttribute(key, value);
        }
      }
    }

    return ret;
  }