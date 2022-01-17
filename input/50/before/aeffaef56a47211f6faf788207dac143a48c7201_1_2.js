function () {
          if (callback) {
            callback.apply(socket, arguments);
          }
        }