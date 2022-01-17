function(err, allvideos) {
        for(var ix = 0; ix < allvideos.length; ix++) {
          allvideos[ix] = JSON.parse(allvideos[ix]);
          allvideos[ix].unshift(obj.data[ix]);
        }
        socket.emit("all-videos", {
          len: obj.len,
          channel: _user.channel,
          data: allvideos
        });
      }