function getter(request, callback) {
    var start = new Date(request.start),
        stop = new Date(request.stop),
        id = request.id;

    // Validate the dates.
    if (isNaN(start)) return callback({error: "invalid start"}), -1;
    if (isNaN(stop)) return callback({error: "invalid stop"}), -1;

    // Parse the expression.
    var expression;
    try {
      expression = parser.parse(request.expression);
    } catch (e) {
      return callback({error: "invalid expression"}), -1;
    }

    // Round start and stop to the appropriate time step.
    var tier = tiers[+request.step];
    if (!tier) return callback({error: "invalid step"}), -1;
    start = tier.floor(start);
    stop = tier.ceil(stop);

    // Compute the request metric!
    measure(expression, start, stop, tier, "id" in request
        ? function(time, value) { callback({time: time, value: value, id: id}); }
        : function(time, value) { callback({time: time, value: value}); });
  }