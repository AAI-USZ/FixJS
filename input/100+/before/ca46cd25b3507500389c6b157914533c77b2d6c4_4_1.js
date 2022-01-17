function (name) {
  console.log('Joined', name);
  var net = this, channel = this.channelHandles[name] = new Channel(this, name);
  channel.init();

  function reply(msg) {
    net.say(name, channel.config.colors ?
      msg : msg.replace(/[\x02\x1f\x16\x0f]|\x03\d{0,2}(?:,\d{0,2})?/g, ''));
  }

  this.on('message' + name, function (from, message, raw) {
    channel.handleMessage.call(channel, {from: from, text: message, raw: raw, reply: reply});
  });
}