function handler(info, cb) {
  var results = info.matches;
  if (!results) { return; }

  request({
    url: 'http://www.reddit.com/by_id/t3_' + results[2] + '.json',
    headers: {'User-Agent': 'tuhBot IRC-bot by /u/tuhoojabotti'}
  }, function (err, res, body) {
      if (err || res.statusCode !== 200) { return; }
      var data = JSON.parse(body).data.children[0].data;

      if (data) {
        if (data.url) {
          urly(data.url, function (err, url) {
            if (err) { cb(data); return; }
            data.short_url = url;
            cb(data);
          });
        } else {
          cb(data);
        }
      }
    }
  );
}