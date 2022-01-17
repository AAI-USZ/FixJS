function(postUrl, data, callback, redirects)
{
  redirects = redirects || 5;
  postUrl = url.parse(postUrl);

  var path = postUrl.pathname || '/';
  if(postUrl.query)
  {
    path += '?' + postUrl.query;
  }

  var encodedData = _encodePostData(data);
  var options = 
  {
    host: postUrl.hostname,
    path: path,
    port: _isDef(postUrl.port) ? postUrl.port :
      (postUrl.protocol == 'https:' ? 443 : 80),
    headers: 
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': encodedData.length
    },
    method: 'POST'
  };

  _proxyRequest(postUrl.protocol, options);

  (postUrl.protocol == 'https:' ? https : http).request(options, function(res)
  {
    var data = '';
    res.on('data', function(chunk)
    {
      data += chunk;
    });

    var done = function()
    {
      if(res.headers.location && --redirects)
      {
        _post(res.headers.location, params, callback, redirects);
      }
      else
      {
        callback(data, res.headers, res.statusCode);
      }
    }

    res.on('end', function() { done(); });
    res.on('close', function() { done(); });
  }).on('error', function(error)
  {
    return callback(error);
  }).end(encodedData);
}