function (err, js) {
      if (err) {
        if (!(err instanceof Error)) {
          err = new Error(err);
        }
        send(createSomethingWentWrong());
        throw err;
        return;
      }
      cache[key] = js;
      send(js);
    }