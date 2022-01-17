function (err, player) {
            if(err) {
              socket.emit('error', { err: err.err });
            } else {
              player.time = data.lapTime;
              player.save();
            }
          }