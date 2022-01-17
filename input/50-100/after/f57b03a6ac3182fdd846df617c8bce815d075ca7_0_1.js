function (requestMethod, query) {
  var cloudwatch_host = 'monitoring.' + region + '.amazonaws.com';
  var options = {
    host: cloudwatch_host,
    port: 80,
    path: query,
    method: requestMethod,
    headers: {
      'Host': cloudwatch_host,
      'Content-Length': 0
    }
  };
  return options;
}