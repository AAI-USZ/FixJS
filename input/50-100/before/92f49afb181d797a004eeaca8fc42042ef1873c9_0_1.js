function (name) {
  name = name || 'en1';
  
  var interfaces = os.networkInterfaces(),
      interface;
  
  //
  // If the specified interface name is not found
  // return the loopback address.
  //
  if (!interfaces[name]) {
    return '127.0.0.1';
  }
  
  interface = interfaces[name].filter(function (details) {
    return details.family === 'IPv4';
  })[0];
  
  return !interface
    ? '127.0.0.1'
    : interface.address;
}