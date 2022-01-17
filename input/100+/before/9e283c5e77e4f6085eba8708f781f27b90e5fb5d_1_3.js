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
            var client = clients[current_user.username];
            if(logger_users[args.to] == current_user.username) {
              log_message(args.to, {user: args.from, message: args.text});
            }
            if(args.to[0] !== '#'){
              var target;
              target = (client.nick == args.from) ? args.to : args.from;
              logname = (client.nick < target) ? client.nick + target : target + client.nick;

            }
            if(socket.disconnected){
              var channel;
              if(args.to[0] !== '#'){
                if(client.chans[args.from] === undefined){
                  client.chans[args.from] = {serverName: args.from,
                    unread_messages: 0, unread_mentions: 0};
                }
                channel = client.chans[args.from];
                log_message(logname, {user: args.from, message: args.text});
              } else {
                channel = client.chans[args.to];
              }
              channel.unread_messages = channel.unread_messages+1;

              var re = new RegExp('\\b' + client.nick + '\\b', 'g');
              if(re.test(args.text)){
                channel.unread_mentions = channel.unread_mentions+1;
              }
            }
          }
        }

        // This is the logic to assign a user to log messages on join
        if(event == 'join') {
          if(current_user){
            if(!logger_users.hasOwnProperty(args.channel)){
              logger_users[args.channel] = current_user.username;
            }
          }
        }

      }