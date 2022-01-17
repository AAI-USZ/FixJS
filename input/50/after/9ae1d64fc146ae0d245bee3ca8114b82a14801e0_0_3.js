function () {
      res.status = 200;
      if (!res.isComplete) {
        res.isComplete = true;
        res.emit('load', {});
      }
    }