function (err, fbid) {
          if(err || fbid === null) {
            socket.emit('error', { err: err });
          }

          addPlayerToSocket(fbid, socket, function (err, player) {
            if(err) {
              socket.emit('error', { err: err.err });
            } else {
              player.time = data.lapTime;
              player.save();
            }
          });
        }