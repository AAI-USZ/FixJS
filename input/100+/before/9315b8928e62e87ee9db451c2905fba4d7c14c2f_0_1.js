function(route_number, stop_id){
    if (route_number && stop_id) {
      var url = "bus_tracker/route/" + route_number + "/stop_id/" + stop_id + "/get_predictions";
      var ctaTime = BusTracker.ctaTime();

      $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function(data) {
          if ( data[0] ) {
            $.each(data, function(index, option){
              var timeRemaining = BusTracker.calculateTimeRemaining(Date.parse(ctaTime), Date.parse(option.predicted_time));
              var prediction = {route: route_number, destination: option.destination,
                vehicle_id: option.vehicle_id,
                time_remaining: timeRemaining};

               var template = BusTracker.getTemplate(timeRemaining);
               var html = Mustache.to_html(template, prediction);

               BusTracker.showDiv('.output')
               $('.output').append(html);
            });
          } else {
            $('.output').html('');
            $('.output').append("<h3>Sorry, no bus are coming... </h3>");
          }
        }
      });
    }
  }