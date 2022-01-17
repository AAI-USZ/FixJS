function (data) {
    setTimeout(Dashboard._loadNext, 10 + Math.random());

    // A line looks like:
    // graph.path,start timestamp,end timestamp,time delta|value1,value2,None,value3\n
    var line, meta, values, path, ts, delta,
        m, midx, v, shift,

        lu      = this._lastUpdate,
        first   = !lu,
        pie     = this.options.type == 'pie',
        delta   = this.options.refreshRate * 1000,
        series  = data,
        n       = series.length;

    if(pie) {
      var updates = [], sum = 0,
          labelPattern = this.options.labelPattern,
          labels = this.options.labels,
          pattern, label;

      while(n--) {
        line    = series[n];
        if(!line) continue;
        path    = this.stripFunctions(line.target);
        values  = line.datapoints;
        m       = values.length;

        while(m--) {
          v = values[m][0];
          if(v !== null) break;
        }

        // if there were no updates
        if(v < 0 || isNaN(v)) return;

        if(this.path2index(path) === -1) this.addSeries(path);
        pattern = this.patternForPath(path);

        label = labelPattern ? mapPath(pattern, path, this.options.labelPattern) : labels[path];
        updates.push([label, v]);
        sum += v;

        if(first) this._lastUpdate = +line[2];
      }

      n = updates.length;
      if(!n) return; // the first update might be screwed up
      while(n--) {
        v = Math.round(updates[n][1]/sum*1000)/1000;
        if(!isNaN(v)) updates[n][1] = v;
        else return;
      }
      this.g.series[0].setData(updates);

      return;
    }

    // all other charts except the pie chart
    while(n--) {
      line = series[n];
      if(!line) continue;

      values = line.datapoints.reverse();
      this._lastUpdate = values[0][1];
      m = values.length;
      midx = this.path2index(line.target);
      if(midx == -1) midx = this.addSeries(line.target);
      while(m--) {
        v = values[m];
        if((m == 0 && v[0] === null) || v[1] < lu) continue;
        this.g.series[midx].addPoint([v[1]*1000, v[0]], false, !first);
      }

      this.g.redraw();
    }
  }