function (e) {
    var m = JSON.parse(e.data);
    var player = players[m.pid];
    if (player === undefined) {
      player = players[m.pid] = m;
    }
    if (m.type=="youAre") pid = m.pid;
    
    if (m.type != "disconnect") {
      if (m.type == "trace") {
        ctx.strokeStyle = player.color;
        ctx.lineWidth = player.size;
        ctx.beginPath();
        var points = m.points;
        points[0] && ctx.moveTo(points[0].x, points[0].y);
        points.forEach(function (p) {
          ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        m.x = points[points.length-1].x;
        m.y = points[points.length-1].y;

        // clear local canvas if synchronized
        if (m.pid==pid && numTrace == m.num) {
          meCtx.clearRect(0,0,meCtx.canvas.width,meCtx.canvas.height);
        }
      }

      players[m.pid] = $.extend(players[m.pid], m);
    }
    else {
      delete players[m.pid];
    }

    dirty_positions = true;
  }