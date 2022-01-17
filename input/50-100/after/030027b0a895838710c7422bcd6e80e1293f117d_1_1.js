function(track) {
          track.center.chart.fetch({
                  data: $.param({min:rover.get('min'), max:rover.get('max')}),
                  error: function(chart){ chart.trigger('error'); }
             });
          }