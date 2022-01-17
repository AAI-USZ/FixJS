function getter(request, callback) {

    var limit = +request.limit,
        step = +request.step;

    // Provide default start and stop times for recent events.
    // If the limit is not specified, or too big, use the maximum limit.
    if (!(step)) step = 1e4;
    if (!("stop" in request)) request.stop = Math.floor(Date.now() / step) * step;
    if (!("start" in request)) request.start = 0;
    if (!(limit <= limitMax)) limit = limitMax;  

    // If the time between start and stop is too long, then bring the start time
    // forward so that only the most recent results are returned. This is only
    // approximate in the case of months, but why would you want to return
    // exactly ten thousand months? Don't rely on exact limits!
    var start = new Date(request.start),
        stop = new Date(request.stop),
        id = request.id;
    if ((stop - start) / step > limit) start = new Date(stop - step * limit); 

    // Validate the dates.
    // edit: not needed anymore
    //if (isNaN(start)) return callback({error: "invalid start"}), -1;
    //if (isNaN(stop)) return callback({error: "invalid stop"}), -1;

    // Parse the expression.
    var expression;
    try {
      expression = parser.parse(request.expression);
    } catch (e) {
      return callback({error: "invalid expression"}), -1;
    }

    // Round start and stop to the appropriate time step.
    var tier = tiers[step];
    if (!tier) return callback({error: "invalid step"}), -1;
    start = tier.floor(start);
    stop = tier.ceil(stop);

    // Compute the request metric!
    measure(expression, start, stop, tier, "id" in request
        ? function(time, value) { callback({time: time, value: value, id: id}); }
        : function(time, value) { callback({time: time, value: value}); });
  }