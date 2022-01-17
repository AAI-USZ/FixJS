function(callback) {
    this.callback = callback;
    this.client = new irc({
      server: 'irc.wikimedia.org',
      nick: this.ircNickname,
      log: false
    });

    var channels = this.channels;
    var client = this.client;

    client.connect(function () {
      client.join(channels);
      client.on('privmsg', function(msg) { 
        m = parse_msg(msg.params);
        if (m) callback(m);
      });
    });
  }