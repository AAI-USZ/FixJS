function() {
      var args = Array.prototype.slice.call(arguments);
      var object = args.shift();

      this._activeObjects.push(object);
      // intentionally using 'in'
      if ('onactive' in object) {
        object.onactive.apply(object, args);
      }
    }