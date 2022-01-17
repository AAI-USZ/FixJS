function() {
    var clientIds = get(this, 'content'),
        store = get(this, 'store'),
        type = get(this, 'type');

    var ids = clientIds.map(function(clientId) {
      return store.clientIdToId[clientId];
    });

    store.fetchMany(type, ids);
  }