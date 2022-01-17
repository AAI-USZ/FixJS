function(data) {
      !data && (data = this.points)

      var c = this.c
        , i;
      for (i = 0; i < data.length; i++) {
        var pt = data[i]
          , x = pt.x
          , y = pt.y
          , t = pt.t
          , p = pt.isPoint
          , co = pt.color
          , s = pt.size

          if (p) {        
            c.beginPath()
            c.moveTo(x, y)
          } else {
            c.strokeStyle = co
            c.lineWidth = s
            c.lineTo(x, y)
            c.stroke()
          }
      }
    }