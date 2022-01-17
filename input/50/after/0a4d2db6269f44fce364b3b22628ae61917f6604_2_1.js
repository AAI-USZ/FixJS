function(osName) {
  var client = new Client;

  client.osName = osName || gazel.osName;
  if(osName) {
    client.needsOsVerification = true;
  }

  return client;
}