function(json) {
        this.sideload(store, type, json, root);
        store.didCreateRecord(record, json[root]);
      }