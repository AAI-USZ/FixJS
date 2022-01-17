function(){
      if ($('#chat-contents').scrollTop() < 150) {
        var skip = $('#chat-contents').children().length;
        var windowName = irc.chatWindows.getActive().get('name');
        var target;
        if(windowName[0] == '#'){
          target = windowName;
        } else {
          var userName = irc.me.get('nick');
          target = (userName < windowName) ? userName + windowName : windowName + userName;
        }
        irc.socket.emit('getOldMessages',{channelName: target, skip:skip, amount: 50});
      }
    }