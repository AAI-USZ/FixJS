function (err, player) {
            if(err) {
              socket.emit('error');
            } else {
              player.time = data.lapTime;
              player.save();
            }
          }