function(metric) {

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

            })({time: time, value: value}