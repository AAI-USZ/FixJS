function(event) {
    var code = event.target.errorCode;
    call(callback, {
      status: 500,
      error: event.type,
      reason: Object.keys(IDBDatabaseException)[code-1].toLowerCase()
    });
  }