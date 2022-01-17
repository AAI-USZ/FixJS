function update() {
    echollage.collector.request_track(handle_track);
    var decay = Math.pow(0.5, update_count / HALF_LIFE);
    var wait = decay * START_REQUEST_PERIOD + (1 - decay) * SETTLE_REQUEST_PERIOD;
    setTimeout(update, wait);
    update_count++;
  }