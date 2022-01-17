function (name) {
  var net = this, channel = net.channelHandles[name] = new Channel(net, name);
  if (!channel.init()) {
    this.log.warning('Initializing of channel ' + name + ' failed.')
    delete net.channelHandles[name];
    return;
  }

  function reply(msg) {
    net.say(name, channel.config.colors ?
      msg : msg.replace(/[\x02\x1f\x16\x0f]|\x03\d{0,2}(?:,\d{0,2})?/g, ''));
  }

  channel.listener = function (from, message, raw) {
    channel.handleMessage.call(channel,
      {from: from, text: message, raw: raw, reply: reply});
  };

  net.on('message' + name, channel.listener);
}