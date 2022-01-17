function(store, type, json, root) {
    var sideloadedType, mappings, loaded = {};

    loaded[root] = true;

    for (var prop in json) {
      if (!json.hasOwnProperty(prop)) { continue; }
      if (prop === root) { continue; }

      sideloadedType = type.typeForAssociation(prop);

      if (!sideloadedType) {
        mappings = get(this, 'mappings');
        Ember.assert("Your server returned a hash with the key " + prop + " but you have no mappings", !!mappings);

        sideloadedType = get(mappings, prop);

        if (typeof sideloadedType === 'string') {
          sideloadedType = getPath(window, sideloadedType);
        }

        Ember.assert("Your server returned a hash with the key " + prop + " but you have no mapping for it", !!sideloadedType);
      }

      this.sideloadAssociations(store, sideloadedType, json, prop, loaded);
    }
  }