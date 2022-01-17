function(options, callback) {
    var body = []
      , req, oldWrite, oldEnd;

    req = oldRequest.call(http, options, function(res) {
      var datas = [];
      
      res.on('data', function(data) {
        datas.push(data);
      });

      res.once('end', function() {
        var out = generateRequestAndResponse(body, options, res, datas);
        outputs.push(out);
        if (! dont_print) { console.log(SEPARATOR + out + SEPARATOR); }
      });

      callback.apply(res, arguments);

    });
    oldWrite = req.write;
    req.write = function(data) {
      if ('undefined' !== typeof(data)) {
        if (data) {body.push(data); }
        oldWrite.call(req, data);
      }
    };
    oldEnd = req.end;
    req.end = function(data) {
      if ('undefined' !== typeof(data)) {
        req.write(data);
      }
      oldEnd.apply(req, arguments);
    };
    return req;
  }