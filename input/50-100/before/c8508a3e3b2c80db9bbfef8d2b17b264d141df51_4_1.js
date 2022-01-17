function panelFlash() {
    switch(_ev("song-tab")) {
      case 'Everything':
        if(!_db[_channel]) {
          _socket.emit("get-all-videos");
        } else {
          Song.search();
        }
        break;
      case 'History':
        _socket.emit("get-history");
        break;
    }
  }