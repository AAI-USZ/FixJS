function(json) {
        this.sideload(store, type, json, plural);
        store.didCreateRecords(type, records, json[plural]);
      }