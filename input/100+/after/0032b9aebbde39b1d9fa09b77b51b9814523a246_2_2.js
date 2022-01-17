function(io) {
  
  this.particles = [];
  _(100).times(_.bind(function() { this.particles.push(new Particle()); }, this));
  
  this.playerList = [];
  //console.log(io.sockets);
  //console.log(io.sockets.manager);
  //var clients = io.sockets.clients();
  //_(clients.length).times(_.bind(function(){ this.playerList.push(new Icarus()); }, this));
  
  var _this = this;
  
  var timer = setInterval(function() {
    _this.update();
    io.sockets.emit('particle position', _.pluck(_this.particles, 'position'));
  }, 50);
  
  //clearInterval(timer);
}