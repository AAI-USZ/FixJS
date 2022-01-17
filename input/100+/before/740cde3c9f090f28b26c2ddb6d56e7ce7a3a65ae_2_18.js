function(json) {
        this.sideload(store, type, json, plural);
        store.didUpdateRecords(records, json[plural]);
      }