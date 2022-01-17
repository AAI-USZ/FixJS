function(id, callback) {
  var url = '/blocks/exists.json';

  var params = {};
  if (typeof id === 'string')
    params.screen_name = id;
  else
    params.user_id = id;

  this.get(url, params, null, callback);
  return this;
}