function(q, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  if ( typeof callback !== 'function' ) {
    throw new Error('FAIL: INVALID CALLBACK.');
    return this;
  }

  var url = this.options.search_base + '/search.json';
  params = utils.merge(params, {q:q});
  this.get(url, params, callback);
  return this;
}