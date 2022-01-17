function(cb) {
            var req = http.request(options, function(res) {
                var body = '';
                res.on('data', function(chunk) {
                    body += chunk;
                  });
                res.on('end', function() {
                    try {
                      var json = JSON.parse(body);
                    }
                    catch(err) {
                      cb(err);
                      return;
                    }
                    if(res.statusCode >= 300) {
                      var d = JSON.stringify(data) || '';
                      var msg = op + ' ' + d + ' [' + res.statusCode + ']: ' + (json.message || json['__type']);
                      var err = new Error(msg);
                      err.type = json['__type'];
                      err.statusCode = res.statusCode;
                      err.requestId = res.headers['x-amzn-requestid'];
                      err.message = msg;
                      err.code = err.type.substring(err.type.lastIndexOf("#") + 1, err.type.length);
                      err.data = json;
                      cb(err);
                    }
                    else {
                      cb(null, json);
                    }
                  });
              });

            req.on('error', function(err) {
                cb(err);
              });

            req.write(rqBody);
            req.end();
          }