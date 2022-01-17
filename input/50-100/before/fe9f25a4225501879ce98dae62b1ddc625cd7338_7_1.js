function Network(name) {
  this.channelHandles = {};
  this.config = {};
  this.name = name;

  console.log('%s process starting up...', name.green);
  this.loadConfig();
  this.loadChannels();
  this.bindEvents();
  this.startClient();
  this.listenMaster();
  this.forwardEvents();
}