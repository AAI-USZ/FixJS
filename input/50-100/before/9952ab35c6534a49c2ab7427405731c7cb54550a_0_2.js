function (err, player) {
            if(err) {
              socket.emit('error');
            } else {
              socket.emit('test', { playerToSocket: 'added player to socket' });
              player.time = data.lapTime;
              player.save();
            }
          }