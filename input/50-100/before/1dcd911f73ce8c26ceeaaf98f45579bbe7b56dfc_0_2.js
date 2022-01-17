function (path) {
    var options = {data: []};
    if(this.options.type !== 'pie')
      options.name = mapPath(this.patternForPath(path), path, this.options.labelPattern);

    this.g.addSeries(options, false, false);
    return this._metrics.push(path) - 1;
  }