function (peak) {
        var alpha = peak.strength *.75 + .25;
        var color = peak.active ? [Math.round(255 - 195 * peak.match), Math.round(200 + 20 * peak.match), 0].join(',') : '255,10,10';
        g.fillStyle = 'rgba('+color+','+ alpha +')';
        g.fillRect((peak.offset - 2) * 8, 140, 1, 100);
      }