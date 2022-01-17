function() {
                    try {
                      var json = JSON.parse(body);
                    }
                    catch(err) {
                      callback(err);
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
                      console.log(json);
                      err.code = err.type.substring(err.type.lastIndexOf("#") + 1, err.type.length);
                      err.data = json;
                      my.ee.emit(err.code, err);
                      callback(err);
                    }
                    else {
                      callback(null, json);
                    }
                  }