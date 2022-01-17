function(store, type, records, json) {
    if (json) { this.sideload(store, type, json); }
    store.didDeleteRecords(records);
  }