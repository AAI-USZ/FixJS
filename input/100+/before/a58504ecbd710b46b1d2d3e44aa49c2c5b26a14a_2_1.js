function handler(results, cb) {
  if (!results) { return; }
  var id = results[2];

  request('http://api.twitter.com/1/statuses/show/' + id + '.json', function (err, res, body) {
    if (err || res.statusCode != 200) { return; }
    var data = JSON.parse(body);
    cb({
      text: data['text'],
      user: data['user']['screen_name'],
      name: data['user']['name']
    });
  });
}