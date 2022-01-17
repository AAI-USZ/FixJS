function (peak) {
        var alpha = peak.strength *.5 + .5;
        var active = peak.active ? '255' : '0';
        g.fillStyle = 'rgba(255,'+active+',0,'+ alpha +')';
        g.fillRect((peak.offset - 2) * 8, 140, 1, 100);
      }