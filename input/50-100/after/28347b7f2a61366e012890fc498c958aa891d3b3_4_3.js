function(track) {
                      track.center.chart.fetch({
                         data: $.param({min:newMin, max:newMax}),
                         error: function(){alert('error fetching');}
                      });     
                      track.trigger('fetching');                 
                   }