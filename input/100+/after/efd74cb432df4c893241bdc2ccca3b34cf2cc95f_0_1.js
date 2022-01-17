function findTimes(cb){
      var query = {
          agency_key: agency_key,
          stop_id: stop_id
        }
        , timeFormatted = utils.timeToSeconds(today);
      
      StopTime
        .find(query)
        .where('trip_id').in(trip_ids)
        .asc('departure_time')
        .where('departure_time').gte(currentTime)
        .limit(numOfTimes)
        .run(function(e, stopTimes){
		  console.log("stopTimes are: " + stopTimes);
          if(stopTimes.length){
            stopTimes.forEach(function(stopTime){
              times.push(stopTime.departure_time);
            });
            cb(null, 'times');
          } else {
            cb(new Error('No times available for this stop on this date'), 'times');
          }
        });
      }