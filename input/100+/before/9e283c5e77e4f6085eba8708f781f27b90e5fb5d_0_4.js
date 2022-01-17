function(data) {
    console.log('Part event received for ' + data.channel + ' - ' + data.nick);
    var channel = irc.chatWindows.getByName(data.channel);
    if (data.nick === irc.me.get('nick')) {
      channel.part();
    } else {
      var user = channel.userList.getByNick(data.nick);
      user.view.remove();
      user.destroy();
      var partMessage = new Message({type: 'part', nick: data.nick});
      channel.stream.add(partMessage);
    }
  }