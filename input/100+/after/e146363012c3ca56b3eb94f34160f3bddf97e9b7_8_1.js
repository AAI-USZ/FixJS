function(err, response, body) {
    if (err) {
      return cb(err, null);
    }

    if (response.statusCode === 200 && body.length > 0) {
      try {
       
        var
          videoInfo = new Video_Info();
        
        videoInfo.loadByDailymotion(JSON.parse(body));

        return cb(null, videoInfo);
      }
      catch (e) {
        log.critical(e);
        return cb(new Error('Video_Dailymotion_Api.video: internal problem'));
      }
    }
    else if (!err) {
      cb(new Error('Video_Dailymotion_Api.video: no data'));
    }
  }