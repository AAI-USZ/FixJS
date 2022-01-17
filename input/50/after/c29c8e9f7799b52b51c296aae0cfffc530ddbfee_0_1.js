function(id, params, callback) {
  var url = '/statuses/retweets/' + escape(id) + '.json';
  this.get(url, params,  callback);
  return this;
}