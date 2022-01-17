function(type, clientId, id) {
    var recordCache = get(this, 'recordCache'),
        dataCache = this.typeMapFor(type).cidToHash,
        record;

    // If there is already a clientId assigned for this
    // type/id combination, try to find an existing
    // record for that id and return. Otherwise,
    // materialize a new record and set its data to the
    // value we already have.
    if (clientId !== undefined) {
      record = recordCache[clientId];

      if (!record) {
        // create a new instance of the model type in the
        // 'isLoading' state
        record = this.materializeRecord(type, clientId);

        if (typeof dataCache[clientId] === 'object') {
          record.send('didChangeData');
        }
      }
    } else {
      clientId = this.pushHash(LOADING, id, type);

      // create a new instance of the model type in the
      // 'isLoading' state
      record = this.materializeRecord(type, clientId, id);

      // let the adapter set the data, possibly async
      var adapter = get(this, '_adapter');
      if (adapter && adapter.find) { adapter.find(this, type, id); }
      else { throw fmt("Adapter is either null or does not implement `find` method", this); }
    }

    return record;
  }