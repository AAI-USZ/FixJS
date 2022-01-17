function () {
    var metrics = this.options.metrics,
        n = metrics.length,
        q = [],
        m;

    while(n--) {
      m = metrics[n];
      q.push('target=' + encodeURIComponent(Dashboard.adjustPathForMode(m)));
    }

    var from = Dashboard.adjustRangeForMode(this._lastUpdate ? this._lastUpdate : this.options.range);
    q.push('from=' + from);

    return q.join('&');
  }