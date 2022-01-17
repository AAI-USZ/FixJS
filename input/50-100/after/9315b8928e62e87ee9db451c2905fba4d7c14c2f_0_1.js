function(index, option){
              var timeRemaining = BusTracker.timeUntilArrival(option.predicted_time);

              var prediction = {route: route_number, destination: option.destination,
                vehicle_id: option.vehicle_id,
                time_remaining: timeRemaining};

               var template = BusTracker.getTemplate(timeRemaining);
               var html = Mustache.to_html(template, prediction);

               BusTracker.showDiv('.output')
               $('.output').append(html);
            }