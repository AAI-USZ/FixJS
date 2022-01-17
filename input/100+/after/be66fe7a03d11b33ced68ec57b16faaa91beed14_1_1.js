function(done) {
  var counter = 100;

  client.on('data', function(data) {
    assert(data.ok);
    if (--counter === 0) {
      done()
    }
  });

  for (var i = parseInt(counter); i >= 0; i--) {
    client.send(client.Event({
      service : 'hello_tcp_'+i,
      metric  : Math.random(100)*100,
      tags    : ['bar'] }), client.tcp);
  };

}