function(data) {
    var chatWindow = irc.chatWindows.getByName(data.nick);
    if (typeof chatWindow === 'undefined') {
      irc.chatWindows.add({name: data.nick, type: 'pm'})
        .trigger('forMe', 'newPm');
      irc.socket.emit('getOldMessages',{channelName: data.nick, skip:0, amount: 50});
      chatWindow = irc.chatWindows.getByName(data.nick);
    }
    chatWindow.stream.add({sender: data.nick, raw: data.text, type: 'pm'});
  }