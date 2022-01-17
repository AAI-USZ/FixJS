function() {

          streamHook.triggered = false;

          callback.onClose = function() {
            if(streamHook.triggered !== false)
              clearTimeout(streamHook.triggered);
            streamHook = null;
          };

          measure(expression, filter.t.$gte, filter.t.$lt, tier, function(time, value) {
            (function(metric) {

              if (metric.value !== undefined) {
                  metric.id = streamHook.id;
                  if (!streamHook.callback.closed) {
                    streamHook.callback(metric);
                  } else {
                    // We might have a problem here.
                    return;
                  }
              }

              if (!streamHook.triggered) {

                filter.t.$gte = filter.t.$lt;
                filter.t.$lt = streamHook.time = tier.ceil(new Date(Date.now()));

                streamHook.triggered = setTimeout(streamHook.poll, tier.key);
              }

            })({time: time, value: value});
          });
        }