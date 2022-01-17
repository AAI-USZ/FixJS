function(commandText) {
    switch (commandText[0]) {
      case '/join':
        irc.socket.emit('join', commandText[1]);
        break;
      case '/wc':
      case '/close':
      case '/part':
        if (commandText[1]) {
          irc.socket.emit('part', commandText[1]);
          irc.appView.channelList.channelTabs[0].setActive();
        } else {
          irc.socket.emit('part', irc.chatWindows.getActive().get('name'));
          irc.appView.channelList.channelTabs[0].setActive();
        }
        break;

      case '/nick':
        if (commandText[1]) {
          irc.socket.emit('nick', {nick : commandText[1]});
        }
        break;
      case '/topic':
        if (commandText[2]) {
          irc.socket.emit('topic', {name: commandText[1], topic: commandText[2]});
        } else {
          irc.socket.emit('topic', {name: irc.chatWindows.getActive().get('name'),
            topic: commandText[1]});
        }
        break;
      case '/me':
        irc.socket.emit('action', {
          target: irc.chatWindows.getActive().get('name'),
          message: commandText.splice(1).join(" ")
        });
        break;
      case '/query':
      case '/privmsg':
      case '/msg':
        var target = commandText[1];
        var myNick = irc.me.get('nick');
        var logname = (myNick < target) ? myNick + target : target + myNick;
        if (typeof irc.chatWindows.getByName(target) === 'undefined') {
          irc.chatWindows.add({name: target, type: 'pm'});
        }
        irc.socket.emit('getOldMessages',{channelName: logname, skip:-50, amount: 50});
        irc.socket.emit('say', {
          target: target,
          message: commandText.splice(2).join(" ")
        });
        break;
      default:
        commandText[0] = commandText[0].substr(1).toUpperCase();
        irc.socket.emit('command', commandText);
    }
  }