function (session, item, query, client, fn) {
  var collection = this
    , store = this.store;
  
  // support optional argument for query
  if(typeof query == 'function') {
    fn = query;
    query = {};
  }
  
  query = query || {};
  
  if(!item) return fn('You must include an object when saving or updating.');

  // build command object
  var commands = {};
  Object.keys(item).forEach(function (key) {
    if(item[key] && typeof item[key] === 'object' && !Array.isArray(item[key])) {
      Object.keys(item[key]).forEach(function (k) {
        if(k[0] == '$') {
          commands[key] = item[key];
        }
      })
    }
  });

  item = this.sanitize(item);

  // handle id on either body or query
  if(item.id) {
    query.id = item.id;
  }

  debug('saving %j with id %s', item, query.id);

  // build item to validate
  // which includes commands

  collection.execListener('Validate', session, query, item, client, function (err, item) {
    if(err) return fn(err);

    if(query.id) {
      // is PUT
      store.first({id: query.id, $fields: query.$fields}, function(err, obj) {
        if(!obj) return fn(new Error('You can\'t update an object that does not exist.'));
        if(err) return fn(rerr);

        // merge changes
        Object.keys(obj).forEach(function (key) {
          if(typeof item[key] == 'undefined') item[key] = obj[key];
        });

        collection.execCommands('update', item, commands);

        var errors = collection.validate(item);
        
        if(errors) return fn(errors);

        collection.execListener('Put', session, query, item, client, function (err, item) {
          if(err) {
            return fn(err);
          }

          delete item.id;
          store.update(query, item, function (err) {
            if(err) return fn(err);
            item.id = obj.id;
            fn(null, item);
          });
        });
      });
    } else {
      // is POST
      var errors = collection.validate(item, true);

      if(errors) return fn(errors);

      // generate id before event listener
      item.id = store.createUniqueIdentifier();

      collection.execListener('Post', session, query, item, client, function (err, item) {
        if(err) {
          debug('error %j', err);
          return fn(err);
        }
        store.insert(item, fn);
      });
    }
  })
}