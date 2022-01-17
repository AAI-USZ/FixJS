function viewResponder(ctx, next) {
        self._activeObjects.push(object);

        if ('onactive' in object) {
          if (!object.__routerActive) {
            object.onactive();
            object.__routerActive = true;
          }
        }

        next();
      }