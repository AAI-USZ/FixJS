function format_result(args, data, response, callback, context) {
  var error = null;
  var status_code = 0;
  if (response) {
    status_code = response.status || response.statusCode;
  }
  if (status_code === 200 || status_code === 201) {
    if (args.data_type === 'json') {
      //data = data.replace(RE_JSON_BAD_WORD, '');
      try {
        data = JSON.parse(data);
      } catch(e) {
        error = new Error('JSON format error');
        error.name = 'JSONParseError';
        error.data = data;
        error.status_code = status_code;
        data = null;
      }
    }
  } else {
    error = data;
    if (typeof error === 'string') {
      try {
        error = JSON.parse(data);
        var err = new Error();
        err.name = 'HTTPResponseError';
        for (var k in error) {
          err[k] = error[k];
        }
        if (!err.message) {
          err.message = error.error || data;
        }
        error = err;
      } catch (e) {
        error = new Error(data || 'status ' + status_code);
        error.name = 'JSONParseError';
      }
      error.status_code = status_code;
    }
    data = null;
  }
  if (callback) {
    callback.call(context, error, data, response);
  }
}