function (api) {
  api.use('underscore', 'server');
  api.use('localstorage-polyfill', 'client');

  // need this because of the Meteor.users collection but in the future
  // we'd probably want to abstract this away
  api.use('mongo-livedata', ['client', 'server']);

  api.add_files('accounts_common.js', ['client', 'server']);
  api.add_files('accounts_server.js', 'server');

  api.add_files('localstorage_token.js', 'client');
  api.add_files('accounts_client.js', 'client');
}