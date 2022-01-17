function(key, value){
      if(value['serverName'][0] == '#'){
        irc.chatWindows.add({name: value['serverName']});
      } else {
        irc.chatWindows.add({name: value['serverName'], type: 'pm'});
      }
      var channel = irc.chatWindows.getByName(value['serverName']);
      var channelTabs = irc.appView.channelList.channelTabs;
      var channelTab = channelTabs[channelTabs.length-1];
      channel.set({
        topic: value['topic'],
        unread: value['unread_messages'],
        unreadMentions: value['unread_mentions']
      });
      channelTab.updateUnreadCounts();
      if(value['serverName'][0] == '#'){
        channel.userList = new UserList(channel);
        $.each(value.users, function(user, role) {
          channel.userList.add({nick: user, role: role, idle:0, user_status: 'idle', activity: ''});
        });
        irc.socket.emit('getOldMessages',{channelName: value['serverName'], skip:-50, amount: 50});
      } else {
        var myNick = irc.me.get('nick');
        var logname = (myNick < value['serverName']) ? myNick + value['serverName'] : value['serverName'] + myNick;
        irc.socket.emit('getOldMessages',{channelName: logname, skip:-50, amount: 50});
        channel.stream.add(new Message({sender:'', raw:''}));
      }
    }