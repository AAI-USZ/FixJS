function(events) {
        // Merge events from all calendars into a single array.
        allEvents = allEvents.concat(events);
        if (--pendingRequests === 0) {
          allEvents.sort(function(first, second) {
            return first.startTime.getTime() - second.startTime.getTime();
          });
          feeds.events = allEvents;
          if (callback) {
            callback();
          }
        }
      }