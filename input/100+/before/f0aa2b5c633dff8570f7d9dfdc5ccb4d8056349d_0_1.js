function getter(request, callback) {

    // Provide default start and stop times for recent events.
    // If the limit is not specified, or too big, use the maximum limit.
    var stream = (request.stop === undefined) ? true : false,//stream = !("stop" in request),
        limit = !(+request.limit >= limitMax) ? request.limit : limitMax,
        step = +request.step ? +request.step : 1e4,
        stop = (request.stop !== undefined) ? new Date(request.stop) : new Date(Math.floor(Date.now() / step) * step);
        start = (request.start !== undefined) ? new Date(request.start) : new Date(0),
        id = request.id;

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

    // I don't understand why sometime expression.filter is defined, and sometime it's not.
    // this condition make the tests successful.
    if(expression.filter) {
      // Copy any expression filters into the query object.
      var filter = {t: {$gte: start, $lt: stop}};
      expression.filter(filter);
    }

    // Round start and stop to the appropriate time step.
    var tier = tiers[step];
    if (!tier) return callback({error: "invalid step"}), -1;
    start = tier.floor(start);
    stop = tier.ceil(stop);

    // Compute the request metric
    measure(expression, start, stop, tier, "id" in request
      ? function(time, value) { callback({time: time, value: value, id: request.id}); }
      : function(time, value) { callback({time: time, value: value}); });

    if (stream) {

      // for efficient polling, polling function handle all request with the same tier.
      var streams = streamsByTier[tier.key];


      // A poll function already exist for this interval :
      // just push this request on the waiting stack, ready to be executed on next poll.
      if (streams) {
        streams.waiting.push({
          expression: expression,
          id: id,
          callback: callback
        });
      }

      // No poll function exist for this interval, let's create a new one.
      else
      {

        streams = streamsByTier[tier.key] = {
          tier: tier,
          start: stop,
          stop: new Date(stop + tier.key),
          waiting: [],
          active: [{
            expression: expression,
            id: id,
            callback: callback
          }]
        };

        // We call the poll function for the next loop.
        // no need to call it right now because measure() already have been called for the current range.

        var timer = streams.stop.getTime() - Date.now();
        if (timer < 0) timer += tier.key;

        setTimeout(poll.bind(this, streams), timer);

      } // if streams
    } // if stream
  }