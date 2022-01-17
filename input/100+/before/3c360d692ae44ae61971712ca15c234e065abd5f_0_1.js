function start() {
  var socket = io.connect('http://taurine.csclub.uwaterloo.ca:3000');
  socket.on('counts', function(data) { console.log(data) });
  socket.on('start', function(img) {
    var canvas = document.getElementById('share');
    var ctx = canvas.getContext('2d');
    for(var i =0; i< img.length;i++) {
      draw(img[i], ctx);
    }
    go(socket, canvas, ctx);
  });
}