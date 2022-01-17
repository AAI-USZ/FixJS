function(track) {
                  if (track.parsed)
                     track.center.chart.set({features: track.left.chart.get('features')});
                  else {
                     track.left.chart.drawOnParse = true;
                     track.trigger('fetching');
                  }
               }