function(socket) {
  var client_id = generate_id();

  socket.on('connect', function() {
    clients[client_id] = socket;
    current_connections++;
    log(client_id + ': connected\t\t('
        + current_connections + ' current connections)');
  });

  socket.on('close', function() {
    delete clients[client_id];
    current_connections--;
    log(client_id + ': closed\t\t('
        + current_connections + ' current connections)');
  });

  socket.on('timeout', function() {
    log(client_id + ': timed out!');
  });

  socket.on('end', function() {
    log(client_id + ': ended the connection');
    // node automatically closes half-open connections
  });

  socket.on('error', function (e) {
    log('Uncaught error in send server: ' + e);
  });
}