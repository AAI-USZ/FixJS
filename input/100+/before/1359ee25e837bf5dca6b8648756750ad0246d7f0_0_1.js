function(player) {
        var always, item, key, playerToSend, _results;
        playerToSend = {};
        always = ['host'];
        for (key in player) {
          item = player[key];
          if (__indexOf.call(always, key) >= 0 || (key !== 'Image' && !(key in lastPlayerSent && lastPlayerSent[key] === item))) {
            playerToSend[key] = item;
          }
        }
        if (player.dx !== 0 || player.dy !== 0) {
          delete playerToSend.x;
          delete playerToSend.y;
        } else {
          delete playerToSend.dx;
          delete playerToSend.dy;
        }
        if ((playerToSend.x != null) || (playerToSend.y != null)) {
          playerToSend.x = player.x;
          playerToSend.y = player.y;
        }
        if (!$.isEmptyObject(playerToSend)) {
          socket.emit('player', playerToSend);
          _results = [];
          for (key in playerToSend) {
            item = playerToSend[key];
            _results.push(lastPlayerSent[key] = item);
          }
          return _results;
        }
      }