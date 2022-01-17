function(data){
      Channel.find({name: data.channelName},
                   {messages: {$slice: [data.skip, data.amount]}},
        function(err, results) {
          if(results){
            if(results[0]){
              if(data.channelName[0] == '#'){
                results[0]['name'] = data.channelName;
              } else {
                results[0]['name'] = data.channelName.replace(client.nick, '');
              }
            }
            socket.emit('oldMessages', results[0]);
          }
      });
    }