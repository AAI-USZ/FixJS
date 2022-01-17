function(done) {
  var counter = 2;

  var listener;
  client.on('data', listener = function(data) {
    assert(data.ok);
    if (--counter === 0) {
      client.removeListener('data', listener);
      setTimeout(done, 100);
    }
  });

  for (var i = parseInt(counter); i >= 0; i--) {
    client.send(client.State({
      service: 'state_tcp',
      state: 'ok'
    }), client.tcp);
  }
}