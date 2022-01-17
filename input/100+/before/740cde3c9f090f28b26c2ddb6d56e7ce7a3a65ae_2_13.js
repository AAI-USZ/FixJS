function(name, association) {
      if (association.kind === 'hasMany') {
        cachedValue = this.cacheFor(name);

        if (cachedValue) {
          var key = association.options.key || name,
              ids = data.get(key) || [];
          var clientIds = Ember.ArrayUtils.map(ids, function(id) {
            return store.clientIdForId(association.type, id);
          });

          set(cachedValue, 'content', Ember.A(clientIds));
          cachedValue.fetch();
        }
      }
    }