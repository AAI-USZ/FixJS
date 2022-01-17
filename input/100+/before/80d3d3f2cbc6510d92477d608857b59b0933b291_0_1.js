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
    client.send(client.Event({
      service : 'hello_tcp_'+i,
      metric  : Math.random(100)*100,
      tags    : ['bar'] }), client.tcp);
  };

}