function(socket) {
  var client_id = generate_id();
  var client_name = '[' + socket.remoteAddress + '] [#' + client_id + '] ';

  socket.on('connect', function() {
    clients[client_id] = socket;
    current_connections++;
    log(client_name + 'connected\t\t('
        + current_connections + ' current connections)');
  });

  socket.on('close', function() {
    delete clients[client_id];
    current_connections--;
    log(client_name + 'closed\t\t('
        + current_connections + ' current connections)');
  });

  socket.on('timeout', function() {
    log(client_name + 'timed out!');
  });

  socket.on('end', function() {
    log(client_name + 'ended the connection');
    // node automatically closes half-open connections
  });

  socket.on('error', function (e) {
    log(cliient_name + 'Uncaught error in send server: ' + e);
  });
}