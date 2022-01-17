function(next) {
  if (typeof next !== 'function') next = function(err) {
    if (err) console.error(err.message)
  };
  var Provider = require('nconf').Provider;
  this.nconf = new Provider();
  this.load(next);
}