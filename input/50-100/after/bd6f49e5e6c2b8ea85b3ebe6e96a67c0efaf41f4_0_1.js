function loadAlerts(services, refresh) {
  var delayer = 0;
  $.each(services, function(service, filter) {
    setTimeout(function() { 
      getAlerts(service, filter, refresh);
    }, delayer);
    delayer += 100;
  });
}