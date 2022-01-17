function(id, cb)
{
  log.debug('Video_Dailymotion_Api.video(' + id + ')');

  var url = apiEndpoint + '/video/' + id + '?fields=title,thumbnail_medium_url';  //TODO

  request.get({url : url}, function(err, response, body) {
    if (err) {
      return cb(err, null);
    }

    if (response.statusCode === 200 && body.length > 0) {
      try {
        var raw = JSON.parse(body), data = {
          title : raw.title,
          thumb : raw.thumbnail_medium_url
        };

        return cb(null, data);
      }
      catch (e) {
        cb(new Error('parsing error'));
      }
    }
    else if (!err) {
      cb(new Error('Video_Dailymotion_Api.video: no data'));
    }
  });
}