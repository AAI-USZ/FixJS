function allocate(err) {
    if (operation.retry(err)) return;

    fn.apply(fn, arguments);
  }