function(img) {
    var status = document.getElementById('status');
    status.textContent = "Connected";
    var canvas = document.getElementById('share');
    var ctx = canvas.getContext('2d');
    for(var i =0; i< img.length;i++) {
      draw(img[i], ctx);
    }
    go(socket, canvas, ctx);
  }