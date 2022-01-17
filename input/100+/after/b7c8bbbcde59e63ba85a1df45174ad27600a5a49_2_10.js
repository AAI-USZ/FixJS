function(event,ui) {

            // check if event was fired by user and if so, proceed
            // this stops change from firing when programmatically changing value
            if (event.originalEvent) {
                //var bufferSize = (rover.scale.scale.max - rover.scale.scale.min) * rover.bufferMultiple;
                // var max = rover.get('max');
                // var min = rover.get('min');
                var bufferSize = rover.getBufferWidth();
                var newMin = Math.max( rover.get('displayMin') - bufferSize, 1 );
                var newMax = rover.get('displayMax') + bufferSize;

                // var totalNts = newMax - newMin;
                // var widthNts = max - min;
                // var widthPx = $(rover.canvasContentDiv).width();
                // var totalPx = widthPx / (widthNts / totalNts);
                // var leftNts = min;
                
                if ( newMin < rover.oldMin || newMax > rover.oldMax ) {
                   rover.set( {min:newMin, max:newMax} );
                   _(rover.tracks.models).each( function(track) {
                      track.center.chart.fetch({
                         data: $.param({min:newMin, max:newMax}),
                         error: function(){alert('error fetching');}
                      });                      
                   });
                } else {
                   rover.set({ min:newMin, max:newMax });
                }
                
                
             }
         }