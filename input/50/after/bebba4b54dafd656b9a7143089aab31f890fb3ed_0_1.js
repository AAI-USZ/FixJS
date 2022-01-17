function() {
      if(this._data === undefined) {
        this._data = new cdb.admin.CartoDBTableData(null, {
          name: this.get('id')
        });
      }
      return this._data;
    }