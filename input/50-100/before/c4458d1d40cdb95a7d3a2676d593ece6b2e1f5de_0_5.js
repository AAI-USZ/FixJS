function() {
  var REQUEST_PERIOD = 3000;

  function handle_track(track) {
    if (track)
      echollage.display.replace_next(track);
  };

  function update() {
    echollage.collector.request_track(handle_track);
    setTimeout(update, REQUEST_PERIOD);
  };

  var start = function() {
    echollage.collector.set_base_artist('AR6XZ861187FB4CECD');
    echollage.display.init();
    setTimeout(update, REQUEST_PERIOD);
  };

  return {
    start: start,
  };
}