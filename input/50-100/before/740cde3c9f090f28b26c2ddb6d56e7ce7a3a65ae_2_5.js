function(json) {
        this.sideload(store, type, json, root);
        store.didUpdateRecord(record, json && json[root]);
      }