function(event, ui) { 
             // flip value so slider looks like we are going from max to min;
            var numNtsToShow = rover.get("zoomMax") - ui['value'] + rover.get("zoomMin");
            var middle = (rover.get('displayMax') - rover.get('displayMin'))/2 + rover.get('displayMin');
            var displayMin = Math.max( (middle - numNtsToShow/2), 1);
            var displayMax = middle + numNtsToShow/2;
            // keep track of current min and max
            rover.set({
               displayMin: displayMin,
               displayMax: displayMax,
               min: displayMin,
               max: displayMax
            });
            // 
            // // redraw rover with the display being numNtsToShow nts wide
            // rover.zoom(numNtsToShow);
          }