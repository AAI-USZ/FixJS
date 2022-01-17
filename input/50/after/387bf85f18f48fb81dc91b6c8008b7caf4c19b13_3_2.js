function(id, params, callback, addData) {
  if (typeof id == 'integer') {
    throw new Error('Error: Argument #1 id must be integer');
  }
  this.request('GET', '/issues/' + id + '.json', params, callback, addData);
}