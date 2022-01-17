function saveStore(memo, name, next) {
    var store = self.stores[name];

    //
    // If the `store` doesn't have a `save` or saveSync`
    // method(s), just ignore it and continue.
    //

    if (store.save) {
      return store.save(function (err, data) {
        if (err) {
          return next(err);
        }
        
        if (typeof data == 'object' && data !== null) {
          memo.push(data);
        }
        
        next(null, memo);
      });
    } 
    else if (store.saveSync) {
      memo.push(store.saveSync());
    }
    
    next(null, memo);
  }