function() {
    // Don't do the poll if we're not polling
    if (!this.get('polling')) return;

    var self = this;

    var endTime = nearestHour();

    var now = endTime.toString(TIME_FORMAT);

    var startTime = endTime.add({seconds: -1 * self.get('bucketSize') * ( self.maxColumns -1 ) });
    var dayBeforeNow = startTime.toString(TIME_FORMAT);

    $.getJSON("/domains/" + this.domain.id + "/diffs/tiles/" + self.get('zoomLevel') + "?range-start=" + dayBeforeNow + "&range-end=" + now, function(data) {
      var swimlaneLabels = self.get('swimlaneLabels').slice(0);     // Retrieve a cloned copy of the swimlane labels
      var buckets = [];
      var maxRows = self.get('maxRows');

      // update swimlane labels
      for (var pair in data) {
        // add label if it doesn't already exist
        if (swimlaneLabels.indexOf(pair) < 0)
          swimlaneLabels.push(pair);
      }
        // Only keep labels that are in the data. Truncate our number of bucket rows to match the number of lanes.
      swimlaneLabels = $.grep(swimlaneLabels, function(pair) { return data[pair]; });
      if (buckets.length > swimlaneLabels.length)
        buckets.splice(swimlaneLabels.length, buckets.length - swimlaneLabels.length);

      // copy data into buckets
      maxRows = Math.max(swimlaneLabels.length, maxRows);
      for (var i = 0; i < maxRows; i++) {
        var values = data[swimlaneLabels[i]];
        if (values) {
          buckets[i] = buckets[i] || [];
          for (var j = 0; j < self.maxColumns; j++)
            buckets[i][j] = values[j] || 0;
        } else {
          // if a pair wasn't in the results, initialize or keep existing data
          if (! buckets[i]) {
            buckets[i] = [];
            for (var j = 0; j < self.maxColumns; j++)
              buckets[i][j] = 0;
          }
        }
      }

      // Update the swimlane labels and buckets
      self.set({swimlaneLabels: swimlaneLabels, buckets: buckets, maxRows: maxRows, startTime: startTime});
    });
  }