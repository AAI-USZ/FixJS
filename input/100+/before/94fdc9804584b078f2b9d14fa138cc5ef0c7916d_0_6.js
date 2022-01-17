function() {
  var update_period = echollage.exponential_decay(500, 3000, 10);
  var update_timeout = null;
  var collector = null;

  // Sends a valid received track to the display.
  function handle_track(track) {
    if (track)
      echollage.display.place_track(track);
  }

  // Requests a new track from the collector.
  function update() {
    collector.request_track(handle_track);
    update_timeout = setTimeout(update, update_period.next());
  }

  // Sets up a new Echo Nest collector for the new artist.
  // Cancels any updates because we need to wait for the new artists.
  var set_focal_artist = function(focal_artist_id) {
    if (update_timeout)
      clearTimeout(update_timeout);
    collector = echollage.collector(focal_artist_id, update);
  };

  // Init everything and start requests.
  var start = function() {
    var on_ready = echollage.on_multiple_ready(1, update);
    collector = echollage.collector('AR6XZ861187FB4CECD', on_ready);
    echollage.display.init();
  };

  return {
    set_focal_artist: set_focal_artist,
    start: start
  };
}