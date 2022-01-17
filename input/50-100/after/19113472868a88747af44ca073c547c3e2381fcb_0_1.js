function () {
    var sql, params, callback;
    sql = arguments[0];
    if (arguments[1] instanceof Array) {
      params = arguments[1];
      callback = arguments[2];
      sql = this.driver._updateSubstitutes(sql, params);
    } else {
      callback = arguments[arguments.length - 1];
    }
    return this._runSqlAll(sql, params, callback);
  }