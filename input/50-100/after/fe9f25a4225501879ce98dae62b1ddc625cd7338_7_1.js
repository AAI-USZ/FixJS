function Network(name) {
  this.channelHandles = {};
  this.config = {};
  this.name = name;

  console.log('%s process starting up...', name.green);
  this.log = new log(name, process.cwd() + '/network.log');
  this.loadConfig();
  this.loadChannels();
  this.bindEvents();
  this.startClient();
  this.listenMaster();
  this.forwardEvents();
}