function(id, callback) {
  if (typeof id == 'integer') {
    throw new Error('Error: Argument #1 id must be integer');
  }
  this.request('GET', '/issues/' + id + '.json', {}, callback);
}