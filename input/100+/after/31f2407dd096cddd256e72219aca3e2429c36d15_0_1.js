function(value, key, path) {
    var store, psk = this.get('storeKey'), csk, childRecord, recordType;

    // If no path is given, it must be the key.
    if (SC.none(path)) path = key;

    // If a record instance is passed, simply use the storeKey. This allows 
    // you to pass a record from a chained store to get the same record in the
    // current store.
    if (value && value.get && value.get('isRecord')) {
      childRecord = value;
    } else {
      recordType = this._materializeNestedRecordType(value, key);
      childRecord = this.createNestedRecord(recordType, value, psk, path);
    }

    if (childRecord) {
      this.isParentRecord = YES;
      store = this.get('store');
      csk = childRecord.get('storeKey');
      store.registerChildToParent(psk, csk, path);

      // Set the _parentKey attribute so that we can notify the parent of changes to the property
      // associated with the nested record. Note that if this is a path to a specific object in a
      // nested record array (ex. 'children.2'), we only care about the key itself and not the
      // index.
      if (SC.typeOf(key) === SC.T_STRING) {
        childRecord._parentKey = key.split('.')[0];
      }
    }
      
    return childRecord;
  }