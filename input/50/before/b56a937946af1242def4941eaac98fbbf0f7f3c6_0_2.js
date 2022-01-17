function() {
                // Clear the queue so we don't spit out a bunch of
                // queued up requests after the error
                if (queue && requestQueue[queue]) {
                    requestQueue[queue].clearQueue();
                }

                if ($.isFunction(fnError)) {
                    fnError();
                }
            }