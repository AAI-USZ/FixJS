function(index, removed, added) {
    var parentRecord = get(this, 'parentRecord');
    var pendingParent = parentRecord && !get(parentRecord, 'id');
    var stateManager = get(this, 'stateManager');

    // Map the array of record objects into an array of  client ids.
    added = added.map(function(record) {
      Ember.assert("You can only add records of " + (get(this, 'type') && get(this, 'type').toString()) + " to this association.", !get(this, 'type') || (get(this, 'type') === record.constructor));

      // If the record to which this many array belongs does not yet
      // have an id, notify the newly-added record that it must wait
      // for the parent to receive an id before the child can be
      // saved.
      if (pendingParent) {
        record.send('waitingOn', parentRecord);
      }

      this.assignInverse(record, parentRecord);

      stateManager.send('recordWasAdded', record);

      return record.get('clientId');
    }, this);

    var store = this.store;

    var len = index+removed, record;
    for (var i = index; i < len; i++) {
      // TODO: null out inverse FK
      record = this.objectAt(i);
      this.assignInverse(record, parentRecord, true);

      // If we put the child record into a pending state because
      // we were waiting on the parent record to get an id, we
      // can tell the child it no longer needs to wait.
      if (pendingParent) {
        record.send('doneWaitingOn', parentRecord);
      }

      stateManager.send('recordWasAdded', record);
    }

    this._super(index, removed, added);
  }