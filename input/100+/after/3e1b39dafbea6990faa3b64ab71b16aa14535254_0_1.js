function getCountersFromHTTP() {
  // If request times out or if we get unexpected output, report error and reschedule
  function refreshFailed() {
    window.clearTimeout(requestTimeout);
    reportError();
    scheduleRefresh(COUNTER_REFRESH_INTERVAL);
  }

  // If request succeeds, update counters and reschedule
  function refreshSucceeded(feedData) {
    parseCounters(feedData);
    scheduleRefresh(COUNTER_REFRESH_INTERVAL);
  }

  var httpRequest = new XMLHttpRequest();
  var requestTimeout = window.setTimeout(function() {
    httpRequest.abort();
    reportError();
    scheduleRefresh(COUNTER_REFRESH_INTERVAL);
  }, 20000);

  httpRequest.onerror = function(err) {
    console.log(err);
    refreshFailed();
  }

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status >= 400) {
        console.log('Got HTTP error: ' + httpRequest.status + ' (' + httpRequest.statusText + ')');
        refreshFailed();
      } else if (httpRequest.responseText) {
        window.clearTimeout(requestTimeout);
        var feedData;
        try {
          feedData = JSON.parse(httpRequest.responseText);
          refreshSucceeded(feedData);
        } catch (exception) {
          console.log('Exception while parsing json: ' + exception);
          refreshFailed();
        }
      } else {
        console.log('Got nothing!');
        refreshFailed();
      }
    }
  }

  try {
    httpRequest.open('GET', 'http://theoldreader.com/feeds/counts.json', true);
    httpRequest.send(null);
  } catch (exception) {
    console.log('Exception while fetching data: ' + exception);
    refreshFailed();
  }
}