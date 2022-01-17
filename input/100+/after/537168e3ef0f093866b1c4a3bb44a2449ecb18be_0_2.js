function(protocol, options)
{
  // If process.env['HTTP_PROXY'] is set, make sure path and
  // the header Host are set to target url.
  // HTTP and HTTPS traffic are sent to the same proxy server. 
  // Example: `export HTTP_PROXY=http://localhost:8000`

  if (!! process.env['HTTP_PROXY']) {
    var proxy = url.parse(process.env['HTTP_PROXY']);
    if (proxy.hostname && proxy.port) {
      var targetHost = options.host;
      if (! options.headers) options.headers = {};

      options.host = proxy.hostname;
      options.port = proxy.port;
      options.path = protocol + '//' + targetHost + options.path;
      options.headers['Host'] = targetHost;
    }
  }
}