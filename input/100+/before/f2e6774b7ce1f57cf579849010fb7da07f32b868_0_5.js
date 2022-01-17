function browser_processVisit(visit) {
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
    }