function(err, results) {
          if(results){
            if(results[0]){
              results[0]['name'] = data.channelName.toLowerCase();
            }
            socket.emit('oldMessages', results[0]);
          }
      }