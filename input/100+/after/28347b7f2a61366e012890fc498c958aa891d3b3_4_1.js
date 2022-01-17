function(track) {
          track.center.chart.fetch({
             data: $.param({min:min, max:max}),
             error: function(){alert('error fetching');}
          });
       }