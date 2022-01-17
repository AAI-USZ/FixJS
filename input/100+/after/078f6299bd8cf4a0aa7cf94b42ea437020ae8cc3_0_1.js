function generateRequestAndResponse(body, options, res, datas) {
  var requestBody = body.map(function(buffer) {
    return buffer.toString('utf8');
  }).join('');
  
  var responseBody = datas.map(function(buffer) {
    return buffer.toString('utf8');
  }).join('');
  
  ret = [];
  ret.push('\nnock(\'');
  ret.push(options.host);
  ret.push('\')\n');
  ret.push('  .');
  ret.push((options.method || 'GET').toLowerCase());
  ret.push('(\'');
  ret.push(options.path);
  ret.push("'");
  if (requestBody) {
    ret.push(', ');
    ret.push(JSON.stringify(requestBody));
  }
  ret.push(")\n");
  
  ret.push('  .reply(');
  ret.push(res.statusCode.toString());
  ret.push(', ');
  ret.push(JSON.stringify(responseBody));
  if (res.headers) {
    ret.push(', ');
    ret.push(inspect(res.headers));
  }
  ret.push(');\n');

  return ret.join('');
}