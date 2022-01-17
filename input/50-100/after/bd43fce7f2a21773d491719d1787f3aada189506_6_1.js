function handler(info, cb) {
  var results = info.matches;
  if (!results) { return; }

  request('http://gdata.youtube.com/feeds/api/videos/' + results[1] + '?alt=jsonc&v=2',
    function (err, res, body) {
      if (err || res.statusCode !== 200) { return; }
      var data = JSON.parse(body).data;
      if (data) { cb(data); } // No data found.
    }
  );
}