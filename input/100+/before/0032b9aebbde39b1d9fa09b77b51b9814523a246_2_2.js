function(io) {
  
  this.particles = [];
  _(100).times(_.bind(function() { this.particles.push(new Particle()); }, this));
  
  this.playerList = [];
  var clients = io.sockets.clients();
  // console.log(clients);
  
  var _this = this;
  
  // socket emit universe
  var timer = setInterval(function() {
    _this.update();
    io.sockets.emit('particle position', _.pluck(_this.particles, 'position'));
  }, 50);
  
  //clearInterval(timer);
}