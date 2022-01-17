function (e) {
          client.removeAllListeners('end');
          callback(e);
        }