function(err, data) {
      if (err) return say(err)

      var user   = data.recenttracks['@attr'].user
        , track  = data.recenttracks.track
        , artist, title

      if (!track) return say('Could not lookup latest track...')

      if (Array.isArray(track)) {
        track = track[0]
      }

      title  = track.name
      artist = track.artist['#text']

      if (!nick || (!artist && !title)) {
        return say(nick +' was not found on last.fm')
      }

      if (track['@attr'] &&
          track['@attr']['nowplaying'] == 'true') {
        say(user +' is currently listening to:')
      }
      else {
        say(user +' last played track was:')
      }

      say(artist +' - '+ title)
    }