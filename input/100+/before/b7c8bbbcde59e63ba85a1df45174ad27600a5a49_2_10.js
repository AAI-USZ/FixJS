function(event,ui) {

            // check if event was fired by user and if so, proceed
            // this stops change from firing when programmatically changing value
            if (event.originalEvent) {
                //var bufferSize = (rover.scale.scale.max - rover.scale.scale.min) * rover.bufferMultiple;
                var max = rover.get('max');
                var min = rover.get('min');
                var bufferSize = (max - min) * rover.get('bufferMultiple');
                var newMin = Math.max(min-bufferSize,1);
                var newMax = max+bufferSize;                
                // var totalNts = newMax - newMin;
                // var widthNts = max - min;
                // var widthPx = $(rover.canvasContentDiv).width();
                // var totalPx = widthPx / (widthNts / totalNts);
                // var leftNts = min;
                
                rover.set({ min:newMin, max:newMax });
      
                // if (newMin < min || newMax > max) {
                //    rover.fetchAll( parseInt(newMin), parseInt(newMax), 'center');
                //    rover.draw(newMin, newMax, totalPx, leftNts, true);
                // } else
                //    rover.draw(newMin, newMax, totalPx, leftNts, false);
                // rover.set({ min: newMin,
                //             max: newMax
                //          });
      //                   rover.setViewMinMax(newMin, newMax)
             }
         }