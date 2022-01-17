function panelFlash() {
    switch(_ev("song-tab")) {
      case 'Everything':
        if(!_db[_channel]) {
          _socket.emit("get-all-videos", 0, 10000);
        } else {
          Song.search();
        }
        break;
      case 'History':
        _socket.emit("get-history");
        break;
    }
  }