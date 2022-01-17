function(store, type, id) {
    var root = this.rootForType(type);

    this.ajax(this.buildURL(root, id), "GET", {
      success: function(json) {
        this.sideload(store, type, json, root);
        store.load(type, json[root]);
      }
    });
  }