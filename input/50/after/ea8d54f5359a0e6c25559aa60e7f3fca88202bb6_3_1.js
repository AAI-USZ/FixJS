function (err) {
    if (err.code === 'ENOENT') {
      err = null;
    }
    callback.call(ctx, err, null);
  }