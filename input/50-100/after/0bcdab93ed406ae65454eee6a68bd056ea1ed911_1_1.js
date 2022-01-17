function handler(matches, cb) {
  request('http://api.twitter.com/1/statuses/show/' + matches[1] + '.json',
    function (err, res, body) {
      if (err || res.statusCode != 200) { return; }
      var data = JSON.parse(body);
      normalizeUrls(data.text, function (text) {
        cb({
          text: text,
          user: data.user.screen_name,
          name: data.user.name
        });
      });
    }
  );
}