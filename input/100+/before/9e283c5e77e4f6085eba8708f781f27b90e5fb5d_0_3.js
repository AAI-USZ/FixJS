function(data) {
    var chatWindow = irc.chatWindows.getByName(data.nick);
    if (typeof chatWindow === 'undefined') {
      var myNick = irc.me.get('nick');
      var logname = (myNick < data.nick) ? myNick + data.nick : data.nick + myNick;
      irc.chatWindows.add({name: data.nick, type: 'pm'})
        .trigger('forMe', 'newPm');
      irc.socket.emit('getOldMessages',{channelName: logname, skip:-50, amount: 50});
      chatWindow = irc.chatWindows.getByName(data.nick);
    }
    chatWindow.stream.add({sender: data.nick, raw: data.text, type: 'pm'});
  }