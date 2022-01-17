function (name) {
  name = name.toLowerCase();
  var channel = this.channelHandles[name];
  this.removeListener('message' + name, channel.listener);
  channel.clear();
  channel = undefined;
  delete this.channelHandles[name];
}