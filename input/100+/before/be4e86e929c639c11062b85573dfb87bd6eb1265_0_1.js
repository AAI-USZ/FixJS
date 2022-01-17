function(err, data) {
      if (err) return say(err)

      var user   = data.recenttracks['@attr'].user
        , track  = data.recenttracks.track[0].name
        , artist = data.recenttracks.track[0].artist['#text']

      if (!nick || (!artist && !track)) {
        return say(nick +' was not found on last.fm')
      }

      if (data.recenttracks.track[0]['@attr'] &&
          data.recenttracks.track[0]['@attr']['nowplaying'] == 'true') {
        say(user +' is currently listening to:')
      }
      else {
        say(user +' last played track was:')
      }

      say(artist +' - '+ track)
    }