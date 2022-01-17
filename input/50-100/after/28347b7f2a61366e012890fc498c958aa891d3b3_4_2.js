function(track) {                  
                  if (track.parsed)
                     track.center.chart.set({features: track.right.chart.get('features')});
                  else {
                     track.right.chart.drawOnParse = true;
                     track.trigger('fetching');
                  }
               }