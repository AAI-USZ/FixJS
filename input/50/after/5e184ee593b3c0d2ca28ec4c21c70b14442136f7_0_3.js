function() {
    clients[client_id] = socket;
    current_connections++;
    log(client_name + 'connected\t\t('
        + current_connections + ' current connections)');
  }