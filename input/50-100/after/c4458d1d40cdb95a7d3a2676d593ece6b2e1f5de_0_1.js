function(artist_id) {
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
  }