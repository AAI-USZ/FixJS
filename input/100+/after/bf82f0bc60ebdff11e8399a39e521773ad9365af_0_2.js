function (/* method, [key, obj], callback */) {
  var args     = Array.prototype.slice.call(arguments),
      that     = this,
      callback = args.pop(),
      method   = args.shift(),
      key      = args.shift(),
      obj      = args.shift();

  if (key) args.push(key);
  if (obj) args.push(obj.properties ? obj.properties : obj);
  // else obj = this.connection.cache.get(key) || {_id: key};

  this.runBeforeHooks(method, obj, callback, function () {
    args.push(function (e, result) {
      var Factory;

      if (e) {
        if (e.status >= 500) {
          throw new(Error)(e);
        } else {
          that.runAfterHooks(method, e, obj, function () {
            that.emit("error", e, obj);
            if (callback) {
              callback(e);
            }
          });
        }
      } else {
        if (Array.isArray(result)) {
          result = result.map(function (r) {
            return r ? resourceful.instantiate.call(that, r) : r;
          });
        } else {
          if (method === 'destroy') {
            // that.connection.cache.clear(key);
          } else {
            if (result.rev) {
              // Set the revision if available, so it can be saved
              // to the cache. If we're saving a new object,
              // '_rev' won't be a member of 'resource._properties'
              // so we need to set it here so resource.toJSON() includes it.
              if (obj instanceof resourceful.Resource && !obj._rev) {
                resourceful.defineProperty(obj, '_rev');
              }
              obj._rev = result.rev;
            }

            if (method === 'save') {
              obj._id = result._id || result.id;
            }

            result = resourceful.instantiate.call(that, ['get', 'update'].indexOf(method) !== -1 ? result : obj);

            // TODO: Need to fix bugs in cache
            if (method === 'update') {
              // TODO: Not necessary for identity map
              // that.connection.cache.update(key, obj);
            } else {
              // TODO: We only need to do this if the key doesn't exist
              // that.connection.cache.put(key, result);
            }
          }
        }
        that.runAfterHooks(method, null, obj, function (e, res) {
          if (e) { that.emit('error', e); }
          else   { that.emit(method,
                             method === 'destroy' ? obj : res || result); }
          if (callback) {
            callback(e || null, result);
          }
        });
      }
    });
    that.connection[method].apply(that.connection, args);
  });
}