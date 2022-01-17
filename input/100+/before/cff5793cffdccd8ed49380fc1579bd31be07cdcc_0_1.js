function (error, result) {
        if (error) { console.warn(error); return; }
        callback(db);
      }