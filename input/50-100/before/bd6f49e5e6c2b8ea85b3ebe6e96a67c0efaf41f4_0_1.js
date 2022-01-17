function loadAlerts(services, fromDate, refresh) {
  var delayer = 0;
  $.each(services, function(service, filter) {
    setTimeout(function() { 
      getAlerts(service, filter + fromDate, refresh);
    }, delayer);
    delayer += 100;
  });
}