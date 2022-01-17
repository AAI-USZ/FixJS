function() {
    clients[client_id] = socket;
    current_connections++;
    log(client_id + ': connected\t\t('
        + current_connections + ' current connections)');
  }