function(data) {
    var window = irc.chatWindows.getByName('status');
    if(window === undefined){
      irc.connected = true;
      irc.appView.render();
      irc.chatWindows.add({name: 'status', type: 'status'});
      window = irc.chatWindows.getByName('status');
    }
    window.stream.add({sender: 'error', raw: data.text, type: 'notice'});
  }