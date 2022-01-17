function(res)
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
  }