function(tab) {
    var count;
    if (tab && tab.title) {
      var match = /^The Old Reader \((\d+)\)$/.exec(tab.title);
      if (match && match[1]) {
        count = match[1];
      }
    }
    if (count) {
      console.log("Found counter in our tab (" + count + "), no need to fetch counters via http");
      updateIcon(count);
      scheduleRefresh(COUNTER_REFRESH_INTERVAL / 10);
    } else {
      getCountersFromHTTP();
    }
  }