function(osName) {
  var client = new Client;
  client.osName = osName || gazel.osName;

  return client;
}