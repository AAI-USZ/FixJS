function(focal_artist_id, ready_callback) {
  if (!echollage.nest) {
    console.log("Echo Nest is not available :(");
    return null;
  }

  var similar_artist_ids = [];
  var TRACKS_RESULTS = 30;
  var ARTIST_RESULTS = 100;
  var artist_position = 0;

  // Make a request to the Echo Nest server for artists similar to our
  // focal artist. Result ids are stored and the ready callback is ran.
  var focal_artist_api = echollage.nest.artist({id: focal_artist_id});
  focal_artist_api.similar({results: ARTIST_RESULTS}, function(error, results) {
    if (error || results.artists.length === 0) {
      console.log('Similar artists request failed: ' + error);
      return;
    }
    var artists = results.artists;
    console.log(focal_artist_id);
    console.log(artists);
    for (var i = 0; i < artists.length; ++i)
      similar_artist_ids.push(artists[i].id);
    if (ready_callback)
      ready_callback();
  });

  // Selects a track containing a |preview_url| and a |release_image| from
  // the Echo Nest track search results and returns them with the |artist_id|
  // and |artist_name|. If no valid tracks are found, returns null.
  function select_track(tracks) {
    while (tracks.length != 0) {
      var random_index = parseInt(Math.random() * tracks.length, 10);
      var track_info = tracks[random_index];

      if (track_info.tracks.length > 0) {
        var track = track_info.tracks[0];

        if (track.preview_url && track.release_image) {
          return {
            artist_id: track_info.artist_id,
            artist_name: track_info.artist_name,
            preview_url: track.preview_url,
            release_image: track.release_image
          };
        }
      }
      tracks.splice(random_index, 1);
    }
    return null;
  }

  // Makes request to the Echo Nest server for tracks of a similar artist
  // and returns a track object selected by |select_track|.
  var request_track = function(track_callback) {
    if (similar_artist_ids.length === 0) {
      console.log("The Echo Nest hasn't reponded :(");
      return;
    }

    var handle_tracks = function(error, tracks) {
      if (error) {
        console.log('Tracks request failed: ' + error);
        return;
      }
      track_callback(select_track(tracks));
    };

    var artist_id = similar_artist_ids[artist_position];
    artist_position = (artist_position + 1) % similar_artist_ids.length;

    var request_data = {
      artist_id: artist_id,
      results: TRACKS_RESULTS,
      bucket: ['id:7digital-US', 'tracks']
    };
    echollage.nest.searchSongs(request_data, handle_tracks);
  };

  return {
    request_track: request_track
  };
}