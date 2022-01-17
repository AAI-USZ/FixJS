function(data){
      if (current_user) {
        Channel.find({name: data.channelName.toLowerCase(), server: connection.client.opt.server.toLowerCase(), user: current_user.username},
                     {messages: {$slice: [data.skip, data.amount]}},
          function(err, results) {
            if(results){
              if(results[0]){
                results[0]['name'] = data.channelName.toLowerCase();
              }
              socket.emit('oldMessages', results[0]);
            }
        });
      }
    }