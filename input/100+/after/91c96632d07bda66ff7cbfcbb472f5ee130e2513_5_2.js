function (err, results) {
          if(results){
            var returnData = {};
            if(results && results.length > 0){
              returnData['name'] = data.channelName.toLowerCase();
              returnData['messages'] = results;
            }
            socket.emit('oldMessages', returnData);
          }
        }