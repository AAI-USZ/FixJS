function(next) {
  if (typeof next !== 'function') next = function(err) {
    if (err) console.error(err.message)
  };
  this.nconf = new require('nconf');
  this.load(next);
}