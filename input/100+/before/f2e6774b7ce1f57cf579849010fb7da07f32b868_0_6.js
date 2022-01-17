function browser_showGlobalHistory(visits) {
    this.history.innerHTML = '';
    var thresholds = [
      new Date().valueOf(),              // 0. Now
      DateHelper.todayStarted(),         // 1. Today
      DateHelper.yesterdayStarted(),     // 2. Yesterday
      DateHelper.thisWeekStarted(),      // 3. This week
      DateHelper.thisMonthStarted(),     // 4. This month
      DateHelper.lastSixMonthsStarted(), // 5. Six months
      0                                  // 6. Epoch!
    ];
    var threshold = 0;
    var month = null;
    var year = null;

    visits.forEach(function browser_processVisit(visit) {
       var timestamp = visit.timestamp;
       // Draw new heading if new threshold reached
       if (timestamp > 0 && timestamp < thresholds[threshold]) {
         threshold = this.incrementHistoryThreshold(timestamp, threshold,
           thresholds);
         // Special case for month headings
         if (threshold != 5)
           this.drawHistoryHeading(threshold);
       }
       if (threshold == 5) {
         var timestampDate = new Date(timestamp);
         if (timestampDate.getMonth() != month ||
           timestampDate.getFullYear() != year) {
           month = timestampDate.getMonth();
           year = timestampDate.getFullYear();
           this.drawHistoryHeading(threshold, timestamp);
         }
      }
      this.drawHistoryEntry(visit);
    }, this);
  }