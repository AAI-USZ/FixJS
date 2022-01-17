function (err, js) {
      if (err) {
        if (!(err instanceof Error)) {
          err = new Error(err);
        }
        throw err;
        send(createSomethingWentWrong());
        return;
      }
      cache[key] = js;
      send(js);
    }