function() {
  var the_nest = nest.nest('UPLO3CALHCEZKZTTA');

  var similar_artist_ids = [];
  var active_request_id = null;

  var TRACKS_RESULTS = 30;
  var ARTIST_RESULTS = 100;
  var artist_position = 0;

  // Selects a track containing a |preview_url| and a |release_image| from
  // the Echo Nest track search results and returns them with the |artist_id|
  // and |artist_name|. If no valid tracks are found, returns null.
  function select_track(tracks) {
    while (tracks.length != 0) {
      var random_index = parseInt(Math.random() * tracks.length);
      var track_info = tracks[random_index];

      if (track_info.tracks.length > 0) {
        var track = track_info.tracks[0];

        if (track.preview_url && track.release_image) {
          return {
            artist_id: track_info.artist_id,
            artist_name: track_info.artist_name,
            preview_url: track.preview_url,
            release_image: track.release_image,
          };
        }
      }
      tracks.splice(random_index, 1);
    }
    return null;
  };

  // Makes request to the Echo Nest server requesting tracks for a queued
  // similar artist and returns a track object selected by |select_track|.
  var request_track = function(track_callback) {
    if (!the_nest || similar_artist_ids.length === 0) {
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
      bucket: ['id:7digital-US', 'tracks'],
    };
    the_nest.searchSongs(request_data, handle_tracks);
  };

  // Appends received artist ids to the similar artist queue.
  // Throws away old results because we don't want to actively return tracks
  // for the wrong artist.
  function handle_similar_artists(response_artist_id, error, results) {
    if (error) {
      console.log('Similar artists request failed: ' + error);
      return;
    }
    if (response_artist_id != active_request_id) {
      console.log('Received old similar artist results. Ignoring..');
      return;
    }

    similar_artist_ids = [];
    var artists = results.artists;
    for (i = 0; i < artists.length; ++i)
      similar_artist_ids.push(artists[i].id);
  };

  // Makes request to the Echo Nest server requesting artists similar to our
  // focal artist. Results are passed to |handle_similar_artists|.
  var set_focal_artist = function(artist_id) {
    if (!the_nest) {
      console.log("Echo Nest is not available :(");
      return;
    }
    active_request_id = artist_id;
    focal_artist_api = the_nest.artist({id: artist_id});

    var handler_wrapper = function(error, artists) {
      handle_similar_artists(artist_id, error, artists);
    };
    focal_artist_api.similar({results: ARTIST_RESULTS}, handler_wrapper);
  };

  return {
    set_focal_artist: set_focal_artist,
    request_track: request_track,
  };
}