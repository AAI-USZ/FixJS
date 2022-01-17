function(json, data, meta, options) {
    var key = meta.key,
        manyArray = get(this, key),
        records = [],
        clientId, id;

    if (meta.options.embedded) {
      // TODO: Avoid materializing embedded hashes if possible
      manyArray.forEach(function(record) {
        records.push(record.toJSON(options));
      });
    } else {
      var clientIds = get(manyArray, 'content');

      for (var i=0, l=clientIds.length; i<l; i++) {
        clientId = clientIds[i];
        id = get(this, 'store').clientIdToId[clientId];

        if (id !== undefined) {
          records.push(id);
        }
      }
    }

    key = options.key || get(this, 'namingConvention').keyToJSONKey(key);
    json[key] = records;
  }