function(value, key, path) {
    var store, psk = this.get('storeKey'), csk, childRecord, recordType;

    // if no path is entered it must be the key
    if (SC.none(path)) path = key;
    // if a record instance is passed, simply use the storeKey.  This allows
    // you to pass a record from a chained store to get the same record in the
    // current store.
    if (value && value.get && value.get('isRecord')) {
      childRecord = value;
    }
    else {
      recordType = this._materializeNestedRecordType(value, key);
      childRecord = this.createNestedRecord(recordType, value, psk, path);
    }
    if (childRecord){
      this.isParentRecord = YES;
      store = this.get('store');
      csk = childRecord.get('storeKey');
      store.registerChildToParent(psk, csk, path);
    }

    return childRecord;
  }