function() {
        var data, dateOffset, series;
        data = TimelinePresenter.__super__.data.call(this);
        data.addColumn('datetime', 'Time');
        dateOffset = this.dateOffset() + this.get('interval') * 1000;
        series = this.get('series');
        _.each(series.titles, function(t) {
          return data.addColumn('number', t);
        });
        _.each(series.rows, function(row) {
          row[0] = new Date(row[0] + dateOffset);
          return data.addRow(row);
        });
        return data;
      }