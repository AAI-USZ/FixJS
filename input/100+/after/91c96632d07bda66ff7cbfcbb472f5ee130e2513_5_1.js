function(data){
      if (current_user) {
        var query = Message.find({channel: data.channelName.toLowerCase(), server: connection.server.toLowerCase(), linkedto: current_user.username});

        query.limit(data.amount);
        query.sort('date', -1);
        query.skip(data.skip);

        query.exec(function (err, results) {
          if(results){
            var returnData = {};
            if(results && results.length > 0){
              returnData['name'] = data.channelName.toLowerCase();
              returnData['messages'] = results;
            }
            socket.emit('oldMessages', returnData);
          }
        });
      }
    }