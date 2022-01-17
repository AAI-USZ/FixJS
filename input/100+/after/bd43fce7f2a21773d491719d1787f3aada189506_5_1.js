function handler(info, cb) {
  var results = info.matches;
  if (!results) { return; }

  request('http://api.twitter.com/1/statuses/show/' + results[2] + '.json',
    function (err, res, body) {
      if (err || res.statusCode != 200) { return; }
      var data = JSON.parse(body);
      cb({
        text: data['text'],
        user: data['user']['screen_name'],
        name: data['user']['name']
      });
    }
  );
}