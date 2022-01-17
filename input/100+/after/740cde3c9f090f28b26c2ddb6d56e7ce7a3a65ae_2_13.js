function(name, association) {
      if (association.kind === 'hasMany') {
        cachedValue = this.cacheFor(name);

        if (cachedValue) {
          var key = association.options.key || get(this, 'namingConvention').keyToJSONKey(name),
              ids = data.get(key) || [];
          
          var clientIds;   
          if(association.options.embedded) {
            clientIds = store.loadMany(association.type, ids).clientIds;
          } else {
            clientIds = Ember.EnumerableUtils.map(ids, function(id) {
              return store.clientIdForId(association.type, id);
            });
          }
          
          set(cachedValue, 'content', Ember.A(clientIds));
          cachedValue.fetch();
        }
      }
    }