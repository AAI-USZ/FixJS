function(options, type, name, params, errorMsg, cb) {
    fhreq.POST({
      host: options.host,
      login: options.login,
      uri: api.ENDPOINT + "ide/" + options.domain + "/" + type + "/" + name,
      params: params
    }, function (error, data, raw, response) {
      if (error) {
        return cb(error, null);
      }
      if(data.msg && data.address && data.address["login-status"] == 'none') {
        return cb(new Error("Not authorised\n" + data.msg), null);
      }

      if(data.status && data.status !== 'ok') {
        var msg = data.message || data.msg;
        return cb(errorMsg + msg, data);
      }
      return cb(null, data);
    }); 
  }