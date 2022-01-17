function () {
        if (callback) {
          callback.apply(socket, arguments);
        }
        $rootScope.$apply();
      }