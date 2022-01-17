function(data){
    if ('GET' == this.method) return this.query(data);
    var obj = isObject(data);
    var type = this.header['content-type'];

    // merge
    if (obj && isObject(this._data)) {
      for (var key in data) {
        this._data[key] = data[key];
      }
    } else {
      if (!type) this.type('form');
      type = this.header['content-type'];
      if ('application/x-www-form-urlencoded' == type) {
        this._data = this._data
          ? this._data + '&' + data
          : data;
      } else {
        this._data = (this._data || '') + data;
      }
    }

    if (!obj) return this;
    if (!type) this.type('json');
    return this;
  }