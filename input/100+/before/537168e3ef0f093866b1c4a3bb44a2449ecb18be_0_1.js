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
        var redirectUrl = res.headers.location;
        if(redirectUrl.indexOf('http') !== 0)
        {
          redirectUrl = getUrl.protocol + '//' + getUrl.hostname + ':' + options.port + (redirectUrl.indexOf('/') === 0 ? redirectUrl : '/' + redirectUrl);
        }
        _get(redirectUrl, params, callback, redirects);
      }
      else
      {
        callback(data, res.headers, res.statusCode);
      }
    }

    res.on('end', function() { done(); });
    res.on('close', function() { done(); });
  }