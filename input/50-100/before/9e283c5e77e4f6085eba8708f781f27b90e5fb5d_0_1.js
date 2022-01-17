function(data) {
    var channel = irc.chatWindows.getByName(data.channel);
    channel.userList = new UserList(channel);
    $.each(data.nicks, function(nick, role){
      channel.userList.add(new User({nick: nick, role: role, idle:61, user_status: 'idle', activity: ''}));
    });
  }