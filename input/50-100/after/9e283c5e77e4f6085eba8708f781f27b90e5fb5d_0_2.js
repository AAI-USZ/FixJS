function(data) {
    var channel = irc.chatWindows.getByName(data.channel.toLowerCase());
    channel.set({topic: data.topic});
    var topicMessage = new Message({type: 'topic', nick: data.nick, topic: data.topic});
    channel.stream.add(topicMessage);
  }