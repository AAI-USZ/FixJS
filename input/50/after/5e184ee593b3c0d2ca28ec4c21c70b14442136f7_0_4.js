function() {
    delete clients[client_id];
    current_connections--;
    log(client_name + 'closed\t\t('
        + current_connections + ' current connections)');
  }