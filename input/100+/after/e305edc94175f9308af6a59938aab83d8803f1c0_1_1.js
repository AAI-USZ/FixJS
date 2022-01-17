function (err, response, body) {
    if(err) return cb(err);
    if(response.statusCode !== 200) return cb("Bad response: " + response.statusCode + " " + util.inspect(body));
    var app;
    try{
      app = JSON.parse(body);      
    } catch (x) {
      return cb("Error parsing app: " + util.inspect(body) + " error: " + util.inspect(x));
    }

    if(ini.get('table') === true) {
      df.table = common.createObjectTable(app);    
    }

    return cb(common.nullToUndefined(err), app);
  }