function() {
    _db.lrange("pl:" + _user.channel, 0, -1, function(err, list) {
      // This means an empty channel, it's probably an error
      // and we should probably handle it better than this.
      // But at least we aren't crashing.
      if(list.length == 0) {
        socket.emit("all-videos", {
          channel: _user.channel,
          data: [[]]
        });
        return;
      }
      _db.hmget("vid", list, function(err, allvideos) {
        for(var ix = 0; ix < allvideos.length; ix++) {
          allvideos[ix] = JSON.parse(allvideos[ix]);
          allvideos[ix].unshift(list[ix]);
        }
        socket.emit("all-videos", {
          channel: _user.channel,
          data: allvideos
        });
      });
    });
  }