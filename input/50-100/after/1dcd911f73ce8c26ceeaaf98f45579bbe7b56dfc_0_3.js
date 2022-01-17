function () {
    var q = this.buildQuery();
    Buffer.getJSON('/api/stats?' + q, this.parseResponse.bind(this));

    if(this.options.refreshRate !== 0)
      this._refreshTimeout = setTimeout(this.refresh.bind(this), (this.options.refreshRate || 60) * 1000);
  }