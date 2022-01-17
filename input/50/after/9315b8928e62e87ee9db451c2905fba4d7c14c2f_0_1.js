function(time) {
    var url = "bus_tracker/time_until_arrival/" + time;

    var timeUntilArrival = $.ajax({
      type: 'GET',
      url: url,
      async: false
    }).responseText;

    return timeUntilArrival;
  }