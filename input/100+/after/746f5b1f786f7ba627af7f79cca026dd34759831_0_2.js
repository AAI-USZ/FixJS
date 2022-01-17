function(force) {
    var self = this;

    if (this.range == null) {
      this.reset([]);
    } else {
      var url = "/domains/" + self.domain.id + "/diffs?pairKey=" + this.range.pairKey + "&range-start="
          + this.range.start + "&range-end=" + this.range.end
          + "&offset=" + (this.page * this.listSize) + "&length=" + this.listSize;
      console.log(url);

      $.get(url, function(data) {
        if (!force && data.seqId == self.lastSeqId) return;

        var diffs = _.map(data.diffs, function(diffEl) { diffEl.id = diffEl.seqId; return diffEl; });

        if (self.totalEvents != data.total) {
          self.totalEvents = data.total;
          self.totalPages = Math.ceil(self.totalEvents / self.listSize);
          self.trigger("change:totalEvents", self);
        }

        // Apply updates to the diffs that we currently have
        var newDiffEls = _.map(diffs, function(diff) {
          var current = self.get(diff.seqId);
          if (current == null) {
            return diff;
          } else {
            current.set(diff);    // Apply changes to the difference
            return current;
          }
        });
        self.reset(newDiffEls);

        // Select the first event when we don't have anything selected, or when the current selection is no longer
        // valid
        if (self.selectedEvent == null || !self.get(self.selectedEvent.id)) {
          if (diffs.length > 0)
            self.selectEvent(diffs[0].seqId);
          else
            self.selectEvent(null);
        }

        // If we're now beyond the last page, then scroll back to it
        if (self.page >= self.totalPages && self.totalPages > 0) {
          self.setPage(self.totalPages - 1, true);
        }

        self.lastSeqId = data.seqId;
      });
    }
  }