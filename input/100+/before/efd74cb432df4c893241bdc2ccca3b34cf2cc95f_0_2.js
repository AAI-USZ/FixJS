function(agency_key, route_id, stop_id, direction_id, cb){
    //gets routes for one agency
    
    if (_.isFunction(direction_id)) {
      cb = direction_id;
      direction_id = null; //default is ~ 1/4 mile
    }
    
    var today = new Date()
      , service_ids = []
      , trip_ids = []
      , times = [];

    //Find service_id that matches todays date
    async.series([
      checkFields,
      findServices,
      findTrips,
      findTimes
    ], function(e, results){
      if(e){
        console.log(e);
        cb(e,null);
      } else {
        console.log(results);
        cb(e, times);
      }
    });

    function checkFields(cb){
      if(!agency_key){
        cb(new Error('No agency_key specified'), 'fields');
      } else if(!stop_id){
        cb(new Error('No stop_id specified'), 'fields');
      } else if(!route_id){
        cb(new Error('No route_id specified'), 'fields');
      } else {
        cb(null, 'fields');
      }
    }

    function findServices(cb){
      var query = { agency_key: agency_key }
        , todayFormatted = utils.formatDay(today);
   
      //build query
      query[utils.getDayName(today).toLowerCase()] = 1;
  
      Calendar
        .find(query)
        .where('start_date').lte( todayFormatted )
        .where('end_date').gte( todayFormatted )
        .run(function(e, services){
          if(services.length){
            services.forEach(function(service){
              service_ids.push(service.service_id);
            });
            cb(null, 'services');
          } else {
            cb(new Error('No Service for this date'), 'services');
          }
        });
    }

    function findTrips(cb){		
      var query = {
        agency_key: agency_key,
        route_id: route_id
      }
      
      if ((direction_id === 0) || (direction_id === 1)) {
		query.direction_id = direction_id;
	  } else {
		query["$or"] = [{direction_id:0},{direction_id:1}]
	  }		
      
      Trip
        .find(query)
        .where('service_id').in(service_ids)
        .run(function(e, trips){
          if(trips.length){
            trips.forEach(function(trip){
              trip_ids.push(trip.trip_id);
            });
            cb(null, 'trips')
          } else {
            cb(new Error('No trips for this date'), 'trips');
          }
        });
    }
    
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
  }