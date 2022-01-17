function getter(request, callback) {

    // Provide default start and stop times for recent events.
    // If the limit is not specified, or too big, use the maximum limit.
    var stream = (request.stop === undefined) ? true : false,//stream = !("stop" in request),
        limit = !(+request.limit >= limitMax) ? request.limit : limitMax,
        step = +request.step ? +request.step : 1e4,
        stop = (request.stop !== undefined) ? new Date(request.stop) : new Date(Math.floor(Date.now() / step) * step);
        start = (request.start !== undefined) ? new Date(request.start) : new Date(0),
        id = request.id;

    util.log('>>> request for : ' + id + ' - ' + request.expression);

    // If the time between start and stop is too long, then bring the start time
    // forward so that only the most recent results are returned. This is only
    // approximate in the case of months, but why would you want to return
    // exactly ten thousand months? Don't rely on exact limits!
    if ((stop - start) / step > limit) start = new Date(stop - step * limit);

    // Parse the expression.
    var expression;
    try {
      expression = parser.parse(request.expression);
    } catch (e) {
      return callback({error: "invalid expression"}), -1;
    }

    // Copy any expression filters into the query object.
    var filter = {t: {$gte: start, $lt: stop}};
    expression.filter(filter);

    // Round start and stop to the appropriate time step.
    var tier = tiers[step];
    if (!tier) return callback({error: "invalid step"}), -1;
    start = tier.floor(start);
    stop = tier.ceil(stop);

    // TODO share streams for efficient polling
    if (stream) {
      
      var streamHook = { time: stop, id: request.id, callback: callback, triggered: false,

        poll: (function() {

          if(streamHook.callback.closed) {
            if(streamHook.triggered !== false)
              clearTimeout(streamHook.triggered);
            streamHook = null;
            return;
          }

          streamHook.triggered = false;

          //util.log('>>> request : ' + filter.t.$gte + ' <-> ' + filter.t.$lt);

          measure(expression, filter.t.$gte, filter.t.$lt, tier, function(time, value) {
            (function(metric) {

              if (!streamHook) {
                // streamHook closed already
                return;
              }

              //util.log('>>> metric : ' + JSON.stringify(metric));
              if (metric.value !== undefined) {
                //util.log(' >>> sending : ' + streamHook.id);
                metric.id = streamHook.id;
                if (!streamHook.callback.closed) {
                  streamHook.callback(metric);
                }
              }

              if (!streamHook.triggered) {

                filter.t.$gte = filter.t.$lt;
                filter.t.$lt = streamHook.time = tier.ceil(new Date(Date.now()));

                streamHook.triggered = setTimeout(streamHook.poll, tier.key);
              }

            })({time: time, value: value});
          });
        })
      };

      streamHook.poll();

    } else {

      // Compute the request metric!
      measure(expression, start, stop, tier, "id" in request
      ? function(time, value) { callback({time: time, value: value, id: id}); }
      : function(time, value) { callback({time: time, value: value}); });
    }
  }