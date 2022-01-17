function(host, port, username, password, additional) {
  var defaultOptions = require('./config.js');
  additional = additional || {};

  this._methodMatch = /^GET|PUT|POST|DELETE|HEAD|COPY$/i;
  this._options = {
    'host': host || defaultOptions.host,
    'port': port || defaultOptions.port,
    'username': username || defaultOptions.username,
    'password': password || defaultOptions.password,
    'secure': additional.secure || defaultOptions.secure
  };

  if (this._options.secure === true) {
    http = require('https');
  }
}