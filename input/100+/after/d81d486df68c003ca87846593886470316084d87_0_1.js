function getter(request, callback) {
    var stream = !("stop" in request),
        delay = "delay" in request ? +request.delay : streamDelayDefault,
        start = new Date(request.start),
        stop = stream ? new Date(Date.now() - delay) : new Date(request.stop),
        order_str = "order" in request? request.order : "-time";

    // Validate the dates.
    if (isNaN(start)) return callback({error: "invalid start"}), -1;
    if (isNaN(stop)) return callback({error: "invalid stop"}), -1;

    // Parse the expression.
    var expression;
    try {
      expression = parser.parse(request.expression);
    } catch (error) {
      return callback({error: "invalid expression"}), -1;
    }

    // Order by the given field.
    var order_direction = 1,
        order = {};
    if (order_str.charAt(0) == "-") {
        order_direction *= -1;
        order_str = order_str.substr(1);
    }
    order_str = (order_str == "time") ? "t" : "d." + order_str;
    order[order_str] = order_direction;

    // Set an optional limit on the number of events to return.
    var options = {sort: order, batchSize: 1000};
    if ("limit" in request) options.limit = +request.limit;

    // Copy any expression filters into the query object.
    var filter = {t: {$gte: start, $lt: stop}};
    expression.filter(filter);

    // Request any needed fields.
    var fields = {t: 1};
    expression.fields(fields);

    // Query for the desired events.
    function query(callback) {
      collection(expression.type).events.find(filter, fields, options, function(error, cursor) {
        handle(error);
        cursor.each(function(error, event) {

          // If the callback is closed (i.e., if the WebSocket connection was
          // closed), then abort the query. Note that closing the cursor mid-
          // loop causes an error, which we subsequently ignore!
          if (callback.closed) return cursor.close();

          handle(error);

          // A null event indicates that there are no more results.
          if (event) callback({id: event._id instanceof ObjectID ? undefined : event._id, time: event.t, data: event.d});
          else callback(null);
        });
      });
    }

    // For streaming queries, share streams for efficient polling.
    if (stream) {
      var streams = streamsBySource[expression.source];

      // If there is an existing stream to attach to, backfill the initial set
      // of results to catch the client up to the stream. Add the new callback
      // to a queue, so that when the shared stream finishes its current poll,
      // it begins notifying the new client. Note that we don't pass the null
      // (end terminator) to the callback, because more results are to come!
      if (streams) {
        filter.t.$lt = streams.time;
        streams.waiting.push(callback);
        query(function(event) { if (event) callback(event); });
      }

      // Otherwise, we're creating a new stream, so we're responsible for
      // starting the polling loop. This means notifying active callbacks,
      // detecting when active callbacks are closed, advancing the time window,
      // and moving waiting clients to active clients.
      else {
        streams = streamsBySource[expression.source] = {time: stop, waiting: [], active: [callback]};
        (function poll() {
          query(function(event) {

            // If there's an event, send it to all active, open clients.
            if (event) {
              streams.active.forEach(function(callback) {
                if (!callback.closed) callback(event);
              });
            }

            // Otherwise, we've reached the end of a poll, and it's time to
            // merge the waiting callbacks into the active callbacks. Advance
            // the time range, and set a timeout for the next poll.
            else {
              streams.active = streams.active.concat(streams.waiting).filter(open);
              streams.waiting = [];

              // If no clients remain, then it's safe to delete the shared
              // stream, and we'll no longer be responsible for polling.
              if (!streams.active.length) {
                delete streamsBySource[expression.source];
                return;
              }

              filter.t.$gte = streams.time;
              filter.t.$lt = streams.time = new Date(Date.now() - delay);
              setTimeout(poll, streamInterval);
            }
          });
        })();
      }
    }

    // For non-streaming queries, just send the single batch!
    else query(callback);
  }