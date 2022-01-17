function(ctx, next) {
      var item;
      while ((item = this._activeObjects.pop())) {
        // intentionally using 'in'
        if ('oninactive' in item) {
          item.oninactive();
        }
      }
      next();
    }