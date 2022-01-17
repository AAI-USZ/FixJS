function(min, max) {
       var rover = this;
       var tracks = rover.tracks;
       for (var i in tracks){
          tracks[i].center.chart.scale.min = min;
          tracks[i].center.chart.scale.max = max;
       }
    }