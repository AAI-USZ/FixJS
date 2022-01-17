function(key, value){
      var chanName = value['serverName'].toLowerCase();
      if(chanName[0] == '#'){
        irc.chatWindows.add({name: chanName});
      } else {
        irc.chatWindows.add({name: chanName, type: 'pm'});
      }
      var channel = irc.chatWindows.getByName(chanName);
      var channelTabs = irc.appView.channelList.channelTabs;
      var channelTab = channelTabs[channelTabs.length-1];
      channel.set({
        topic: value['topic'],
        unread: value['unread_messages'],
        unreadMentions: value['unread_mentions']
      });
      channelTab.updateUnreadCounts();
      if(chanName[0] == '#'){
        channel.userList = new UserList(channel);
        $.each(value.users, function(user, role) {
          channel.userList.add({nick: user, role: role, idle:0, user_status: 'idle', activity: ''});
        });
        irc.socket.emit('getOldMessages',{channelName: chanName, skip:-50, amount: 50});
      } else {
        irc.socket.emit('getOldMessages',{channelName: chanName, skip:-50, amount: 50});
        channel.stream.add(new Message({sender:'', raw:''}));
      }
    }