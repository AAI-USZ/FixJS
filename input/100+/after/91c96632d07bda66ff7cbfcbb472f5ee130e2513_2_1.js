function() {
      // Associate specified names with callback arguments
      var callbackArgs = arguments;
      var args = {};
      argNames.forEach(function(arg, index) {
        args[arg] = callbackArgs[index];
      });
      
      // loop through all sockets and emit events
      for (var i = 0; i < instance.sockets.length; i++) {
          instance.sockets[i].emit(event, args);
      }
      
      // This is the logic on what to do on a recieved message
      if(event == 'message'){
        if(instance.username){
          var target;
          if (args.to[0] != '#')
            target = args.from.toLowerCase();
          else
            target = args.to.toLowerCase();
            
          // log this message
          instance.logMessage(target, args.from, args.text);
          
          if(instance.sockets.length == 0){
            instance.client.chans[target].unread_messages++;
            
            var re = new RegExp('\\b' + nick.toLowerCase() + '\\b', 'g');
            if(re.test(args.text.toLowerCase())){
              instance.client.chans[target].unread_mentions++;
            }
          }
        }
      }
      
      // This is the logic to assign a user to log messages on join
      if(event == 'join') {
        var target = args.channel.toLowerCase();
        
        if(instance.client.chans[target] === undefined)
          instance.client.chans[target] = {serverName: target, unread_messages: 0, unread_mentions: 0};
        
        if(instance.username && rejoin){
          // update the user's channel list
          Connection.update({ user: instance.username }, { $addToSet: { channels: target } }, function(err) {});
        }
      }
    }