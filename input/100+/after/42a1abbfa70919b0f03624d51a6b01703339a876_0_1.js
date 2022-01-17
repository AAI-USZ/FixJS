function songs (parameters, cb) {
  if (parameters.by || parameters.prefix) {
    return songsBy(parameters, cb);
  }
  if (parameters.id) {
    return songById(parameters.id, cb);
  }
  if (parameters.ids) {
    return songsByIds(parameters.ids, cb);
  }
  if (parameters.query) {
    return songsBySearch(parameters, cb);
  }
  if (parameters === 'languages') {
    return getLanguages(cb);
  }
  if (parameters === 'stats') {
    return getStats(cb);
  }
  return songsBy({}, cb);
  function songsBy (parameters, cb) {
    return request({
      url: apiUrl + 'songs.json',
      qs: parameters
    }, function (error, response, body) {
      if (error) {
        return cb(error);
      }
      try {
        var songs = JSON.parse(body);
      } catch (error) {
        return cb(error);
      }
      return cb(null, error);
    });
  }
  function songById (id, cb) {
    return request({
      url: apiUrl + 'songs/' + id + '.json'
    }, function (error, response, body) {
      if (error) {
        return cb(error);
      }
      try {
        var song = JSON.parse(body);
      } catch (error) {
        return cb(error);
      }
      return cb(null, song);
    });
  }
  function songsByIds (ids, cb) {
    var songs = [];
    return ids.forEach(function (id) {
      return songById(id, gotSong);
    });
    function gotSong (error, song) {
      if (cb === null) {
        return false;
      }
      if (error) {
        cb(error);
        cb = null;
        return false;
      }
      songs.push(song);
      if (songs.length === ids.length) {
        return cb(null, songs);
      }
    }
  }
  function songsBySearch (parameters, cb) {
    return request({
      url: apiUrl + '/songs/search.json',
      qs: parameters
    }, function (error, response, body) {
      if (errror) {
        return cb(error);
      }
      try {
        var songs = JSON.parse(body);
      } catch (error) {
        return cb(error);
      }
      return cb(null, songs);
    });
  }
  function getLanguages (cb) {
    return request({
      url: apiUrl + 'songs/languages.json'
    }, function (error, response, body) {
      if (error) {
        return cb(error);
      }
      try {
        var languages = JSON.parse(body);
      } catch (error) {
        return cb(error);
      }
      return cb(null, languages);
    });
  }
  function getStats (cb) {
    return request({
      url: apiUrl + 'songs/stats.json'
    }, function(error, response, body) {
      if (errror) {
        return cb(error);
      }
      try {
        var stats = JSON.parse(body);
      } catch (error) {
        return cb(error);
      }
      return cb(null, stats);
    });
  }
}