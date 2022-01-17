function(e, stopTimes){
		  console.log("stopTimes are: " + stopTimes);
          if(stopTimes.length){
            stopTimes.forEach(function(stopTime){
              times.push(stopTime.departure_time);
            });
            cb(null, 'times');
          } else {
            cb(new Error('No times available for this stop on this date'), 'times');
          }
        }