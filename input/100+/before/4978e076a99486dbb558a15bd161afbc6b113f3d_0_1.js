function(typeId) { 
    var self = this;
    // special tickformatter to show labels rather than numbers
    // TODO: we should really use tickFormatter and 1 interval ticks if (and
    // only if) x-axis values are non-numeric
    // However, that is non-trivial to work out from a dataset (datasets may
    // have no field type info). Thus at present we only do this for bars.
    var tickFormatter = function (val) {
      if (self.model.records.models[val]) {
        var out = self.model.records.models[val].get(self.state.attributes.group);
        // if the value was in fact a number we want that not the 
        if (typeof(out) == 'number') {
          return val;
        } else {
          return out;
        }
      }
      return val;
    };
    
    var trackFormatter = function (obj) {
          var x = obj.x;
          var y = obj.y;
          // it's horizontal so we have to flip
          if (self.state.attributes.graphType === 'bars') {
            var _tmp = x;
            x = y;
            y = _tmp;
          }
          // convert back from 'index' value on x-axis (e.g. in cases where non-number values)
          //if (self.model.records.models[x]) {
          //  x = self.model.records.models[x].get(self.state.attributes.group);
          //};

          // is it time series
          var xfield = self.model.fields.get(self.state.attributes.group);
          var isDateTime = xfield.get('type') === 'date';
          if (isDateTime) {
            x = x.toLocaleDateString();
          }

          var content = _.template('<%= group %> = <%= x %>, <%= series %> = <%= y %>', {
            group: self.state.attributes.group,
            x: x,
            series: obj.series.label,
            y: y
          });
        
        return content;
    };
    
    var xaxis = {};
    // check for time series on x-axis
    if (this.model.fields.get(this.state.get('group')).get('type') === 'date') {
      xaxis.mode = 'time';
      xaxis.timeformat = '%y-%b';
      xaxis.autoscaleMargin = 2;
    };
    var yaxis = {};
    yaxis.autoscaleMargin = 2;
    
    var mouse = {};
    mouse.track = true;
    mouse.relative = true;
    mouse.trackFormatter = trackFormatter;
    
    var legend = {};
    legend.position = 'ne';
    
    // mouse.lineColor is set in createSeries
    var optionsPerGraphType = { 
      lines: {
        legend: legend,
        colors: this.graphColors,
        lines: { show: true },
        xaxis: xaxis,
        yaxis: yaxis,
        mouse: mouse
      },
      points: {
        legend: legend,
        colors: this.graphColors,
        points: { show: true, hitRadius: 5 },
        xaxis: xaxis,
        yaxis: yaxis,
        mouse: mouse,
        grid: { hoverable: true, clickable: true }
      },
      'lines-and-points': {
        legend: legend,
        colors: this.graphColors,
        points: { show: true, hitRadius: 5 },
        lines: { show: true },
        xaxis: xaxis,
        yaxis: yaxis,
        mouse: mouse,
        grid: { hoverable: true, clickable: true }
      },
      bars: {
        legend: legend,
        colors: this.graphColors,
        lines: { show: false },
        yaxis: yaxis,
        mouse: { 
            track: true,
            relative: true,
            trackFormatter: trackFormatter,
            fillColor: '#FFFFFF',
            fillOpacity: 0.3,
            position: 'e'
        },
        bars: {
            show: true,
            horizontal: true,
            shadowSize: 0,
            barWidth: 0.8         
        },
      },
      columns: {
        legend: legend,
        colors: this.graphColors,
        lines: { show: false },
        yaxis: yaxis,
        mouse: { 
            track: true,
            relative: true,
            trackFormatter: trackFormatter,
            fillColor: '#FFFFFF',
            fillOpacity: 0.3,
            position: 'n'
        },
        bars: {
            show: true,
            horizontal: false,
            shadowSize: 0,
            barWidth: 0.8         
        },
      },
      grid: { hoverable: true, clickable: true },
    };
    return optionsPerGraphType[typeId];
  }