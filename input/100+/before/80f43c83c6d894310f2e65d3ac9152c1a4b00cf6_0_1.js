function(segments, scale, xoff, yoff) {
    var glist = [];
    var nsegment = 0;
    var x_prev = 0.0;
    var y_prev = 0.0;
    var del_count = 0;
    
    for (var i=0; i<segments.length; i++) {
      var segment = segments[i];
      var prelength = segment.length;
      if (segment.length > 0) {
        var vertex = 0;
        var x = segment[vertex][0]*scale + xoff;
        var y = segment[vertex][1]*scale + yoff;
        if (Math.pow(x_prev-x,2) + Math.pow(y_prev-y,2) > this.DELETION_EPSILON_SQUARED) {
          glist.push("G00X"+x.toFixed(3)+"Y"+y.toFixed(3)+"\n");
          nsegment += 1;
          x_prev = x; y_prev = y;
        } else {
          del_count++;
        }
        for (vertex=1; vertex<segment.length; vertex++) {
          var x = segment[vertex][0]*scale + xoff
          var y = segment[vertex][1]*scale + yoff
          if ((Math.pow(x_prev-x,2) + Math.pow(y_prev-y,2) > this.DELETION_EPSILON_SQUARED) 
                || (vertex == segment.length-1))
          {
            glist.push("G01X"+x.toFixed(3)+"Y"+y.toFixed(3)+"\n");
            x_prev = x; y_prev = y;
          } else {
            del_count++
          }
        }
      }      
    }
    // report if there were many suspiciously many congruent points
    if (del_count > 20) {
      $().uxmessage('warning', "GcodeWriter: deleted many congruent points: " + del_count);
    }       
    // $().uxmessage('notice', "wrote " + nsegment + " G-code toolpath segments");
    return glist.join('');
  }