function (err, fbid) {
          if(err || fbid === null) {
            socket.emit('error', { err: "there was an error for socket.get('fbid') && fbid === null" });
          }

          addPlayerToSocket(fbid, socket, function (err, player) {
            if(err) {
              socket.emit('error', { err: err.err });
            } else {
              if(player.time == 0 || data.lapTime < player.time) {
                player.time = data.lapTime;
                player.save();

                socket.broadcast.emit('new best time', { name: player.name, lapTime: data.lapTime });
                socket.emit('new personal best time', { lapTime: data.lapTime });
                sendInfoMail(player.name + " hat eine neue Bestzeit: " + data.lapTime, "Beste Zeit von " + player.name + " bisher: " + data.lapTime);

                getLeaderBoardData(function (err, result) {
                  if(err) {
                    socket.emit('error', { err: err.err });
                  } else {
                    socket.emit('update leaderboard', { result: result, player: player });
                    socket.broadcast.emit('update leaderboard', { result: result, player: player });
                  }
                });
              } else {
                socket.broadcast.emit('new laptime', { name: player.name, lapTime: data.lapTime });
                socket.emit('new personal laptime', { lapTime: data.lapTime });
              }
            }
          });
        }