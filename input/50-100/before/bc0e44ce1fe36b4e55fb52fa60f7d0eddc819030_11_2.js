function(ctx, next) {
      var item;
      while (item = this._activeObjects.pop()) {
        if ('oninactive' in item) {
          if ('__routerActive' in item) {
            if (item.__routerActive) {
              item.oninactive();
            }
          } else {
            item.oninactive();
          }
        }
        if ('__routerActive' in item) {
          item.__routerActive = false;
        }
      }
      next();
    }