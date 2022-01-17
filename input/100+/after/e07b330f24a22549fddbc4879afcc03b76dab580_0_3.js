function(data) {
    var chanName = data.channel.toLowerCase();
    console.log('Join event received for ' + chanName + ' - ' + data.nick);
    if (data.nick === irc.me.get('nick')) {
      irc.chatWindows.add({name: chanName});
      irc.socket.emit('getOldMessages',{channelName: chanName, skip:0, amount: 50});
    } else {
      var channel = irc.chatWindows.getByName(chanName);
      if (typeof channel === 'undefined') {
        irc.chatWindows.add({name: chanName});
        channel = irc.chatWindows.getByName(chanName);
      }
      channel.userList.add({nick: data.nick, role: data.role, idle:0, user_status: 'idle', activity: ''});
      var joinMessage = new Message({type: 'join', nick: data.nick});
      channel.stream.add(joinMessage);
    }
  }