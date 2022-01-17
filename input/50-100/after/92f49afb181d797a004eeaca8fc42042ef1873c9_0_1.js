function (name) {
  var interfaces = os.networkInterfaces();
  
  var addresses = Object.keys(interfaces).map(function (nic) {
    var addrs = interfaces[nic].filter(function (details) {
      return details.address !== '127.0.0.1' && details.family === 'IPv4'
    });
    return addrs.length ? addrs[0].address : undefined;
  }).filter(Boolean);
  
  return addresses.length
    ? addresses[0]
    : '127.0.0.1';
}