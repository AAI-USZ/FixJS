function(api) {
  api.use('http', 'server');

  api.add_files('accounts_common.js', ['client', 'server']);
  api.add_files('accounts_server.js', 'server');
  api.add_files('accounts_client.js', 'client');
}