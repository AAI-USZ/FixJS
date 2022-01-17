function() {
      if(this._data === undefined) {
        this._data = new cdb.admin.CartoDBTableData(null, {
          name: this.get('name')
        });
      }
      return this._data;
    }