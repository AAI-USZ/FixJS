function(data) {
    var chatWindow = irc.chatWindows.getByName(data.to);
    var type = 'message';
    // Only handle channel messages here; PMs handled separately
    if (data.to.substr(0, 1) === '#') {
      chatWindow.stream.add({sender: data.from, raw: data.text, type: type});
    } else if(data.to !== irc.me.get('nick')) {
      // Handle PMs intiated by me
      chatWindow.stream.add({sender: data.from, raw: data.text, type: 'pm'});
    }
  }