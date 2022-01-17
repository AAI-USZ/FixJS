function() {
        console.log('Event ' + event + ' sent');
        // Associate specified names with callback arguments
        // to avoid getting tripped up on the other side
        var callbackArgs = arguments;
        args = {};
        argNames.forEach(function(arg, index) {
            args[arg] = callbackArgs[index];
        });
        console.log(args);
        socket.emit(event, args);

        // This is the logic on what to do on a recieved message
        if(event == 'message'){
          if(current_user){
            var target;
            if (args.to[0] != '#')
              target = args.from.toLowerCase();
            else
              target = args.to.toLowerCase();
              
            log_message(current_user.username, target, client.opt.server, {user: args.from, message: args.text});
            
            if(client.chans[target] === undefined){
              client.chans[target] = {serverName: target,
                unread_messages: 0, unread_mentions: 0};
            }
            
            if(socket.disconnected){
              client.chans[target].unread_messages++;
              
              var re = new RegExp('\\b' + client.nick.toLowerCase() + '\\b', 'g');
              if(re.test(args.text)){
                client.chans[target].unread_mentions++;
              }
            }
          }
        }
        
        // This is the logic to assign a user to log messages on join
        if(event == 'join') {
          if(current_user){
            // update the user's channel list
            Connection.update({ user: current_user.username }, { $addToSet: { channels: args.channel.toLowerCase() } }, function(err) {
              // handle error
            });
          }
        }

      }