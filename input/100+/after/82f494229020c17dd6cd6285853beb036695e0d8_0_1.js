function(key, x, y, e, graph) {
        var high  = stocks.high()(e.point, e.pointIndex),
            low   = stocks.low()(e.point, e.pointIndex),
            open  = stocks.open()(e.point, e.pointIndex),
            close = stocks.close()(e.point, e.pointIndex);

        return '<h3>' + key + ' on ' + x + '</h3>' +
               '<p>Open ' + open + ', Close ' + close + '</p>' +
               '<p>High ' + high + ', Low ' + low + '</p>';
      }