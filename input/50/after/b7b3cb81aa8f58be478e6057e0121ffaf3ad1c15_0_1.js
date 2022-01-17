function(settings) {
  if (settings && settings.initial_window_size) {
    this.transferWindowSize = settings.initial_window_size;

    for (var streamID in this.streams) {
      this.streams[streamID].updateTransferWindowSize(settings.initial_window_size);
    }
  }
}