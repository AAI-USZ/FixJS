function (error, result) {
        if (error) { console.warn(error); return; }
        if (result == false) { console.warn(result); return; }
        callback(clientref);
      }