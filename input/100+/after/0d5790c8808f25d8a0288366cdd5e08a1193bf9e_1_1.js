function(condition, period, timeout, success, failure, startTime) {

            var currentTime = (new Date()).getTime(),
                test = this;

            if (startTime === undefined) {
                startTime = currentTime;
            }

            if ((currentTime + period) - startTime < timeout) {
                Y.later(period, null, function() {
                    if (condition()) {
                        test.resume(success);
                    } else {
                        test._poll(condition, period, timeout, success, failure, startTime);
                    }
                });
            } else if (failure) {
                test.resume(failure);
            }
        }