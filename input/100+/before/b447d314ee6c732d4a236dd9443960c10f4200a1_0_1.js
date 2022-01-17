function(calendars) {
    // If no calendars are available, then either all are hidden, or the user
    // has not authenticated yet.
    if (calendars.length === 0) {
      callback && callback();
    }

    var allEvents = [];
    var pendingRequests = calendars.length;
    for (var i = 0; i < calendars.length; ++i) {
      feeds.getEventsFrom_(calendars[i], function(events) {
        // Merge events from all calendars into a single array.
        allEvents = allEvents.concat(events);
        if (--pendingRequests === 0) {
          allEvents.sort(function(first, second) {
            return first.startTime.getTime() - second.startTime.getTime();
          });
          feeds.events = allEvents;
          callback && callback();
        }
      });
    }
  }