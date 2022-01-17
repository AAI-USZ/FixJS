function(record) {
      Ember.assert("You can only add records of " + (get(this, 'type') && get(this, 'type').toString()) + " to this association.", !get(this, 'type') || (get(this, 'type') === record.constructor));

      // If the record to which this many array belongs does not yet
      // have an id, notify the newly-added record that it must wait
      // for the parent to receive an id before the child can be
      // saved.
      if (pendingParent) {
        record.send('waitingOn', parentRecord);
      }

      var oldParent = this.assignInverse(record, parentRecord);

      record.get('transaction')
        .relationshipBecameDirty(record, oldParent, parentRecord);

      stateManager.send('recordWasAdded', record);

      return record.get('clientId');
    }