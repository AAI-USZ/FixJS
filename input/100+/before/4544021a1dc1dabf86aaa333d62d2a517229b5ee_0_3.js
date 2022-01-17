function (err, json) {
              if(err != null) {
                if(err.statusCode === 500 || err.statusCode === 503) {
                  my.ee.emit('serverException', err);
                  if(c <= my.retries) {
                    setTimeout(function() {
                      retry(c + 1);
                    }, Math.pow(4, c) * 100);
                  }
                  else
                    cb(err);
                }
                else if(err.statusCode === 400 &&
                        err.code === "ProvisionedThroughputExceededException") {
                  my.ee.emit('throughputException', err);
                  if(c === 0) {
                    retry(c + 1);
                  }
                  else if(c <= my.retries && c <= 10) {
                    setTimeout(function() {
                      retry(c + 1);
                    }, Math.pow(2, c-1) * 50);
                  }
                  else
                    cb(err);
                }
                else {
                  cb(err);
                }
              } else {
                cb(null, json);
              }
            }