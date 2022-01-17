function (err, fbid) {
          if(err || fbid === null) {
            socket.emit('error');
          }

          addPlayerToSocket(fbid, socket, function (err, player) {
            if(err) {
              socket.emit('error');
            } else {
              player.time = data.lapTime;
              player.save();
            }
          });
        }