function allocate(err, connection) {
    if (operation.retry(err)) return;

    fn(operation.mainError(), connection);
  }