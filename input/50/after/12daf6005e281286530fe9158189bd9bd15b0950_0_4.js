function openAsync(dbPath) {
    try {
      var connection = SQLite3.Database.open(dbPath);
      return WinJS.Promise.as(wrapDatabase(connection));
    } catch (e) {
      return wrapComException(e);
    }
  }