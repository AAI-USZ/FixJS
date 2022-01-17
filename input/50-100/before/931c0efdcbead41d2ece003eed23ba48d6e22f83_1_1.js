function(columnName) {
      if(this._columnType[columnName] === undefined) {
        throw new Exception("the column does not exists");
      }
      var c = new cdb.admin.Column({
        table: this,
        name: columnName,
        type: this._columnType[columnName]
      });
      return c;
    }