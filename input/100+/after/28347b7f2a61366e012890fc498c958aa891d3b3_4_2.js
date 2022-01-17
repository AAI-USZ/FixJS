function(model,changes,options) {
      // check if this view is being scrolled by the user
      // if so, do nothing
      if (options.uid != this.el.dataset.uid) {
         // the fetching and buffering logic needs to be refactored out of here. possible to the btracks model
         
         if ( rover.get('displayMin') != rover.get('min') && rover.get('displayMax') != rover.get('max')) {
            var sl = (rover.get('displayMin') - rover.get('min')) * ( rover.getDisplayWidth() / rover.getDisplayWidthNts() );
            sl = Math.round(sl*100) / 100;
            this.el.scrollLeft = sl;

            var bufferSize = rover.getBufferWidth();
            // buffer if getting close to left edge
            if ( !rover.updatingLeft && (rover.get('displayMin') - rover.get('min')) < ( bufferSize*0.20 ) ) {
               rover.updatingLeft = true;
               var newMin = Math.max( rover.get('min')-bufferSize, 1);
               var newMax = newMin + (rover.get('max')-rover.get('min'));
               _.each(rover.tracks.models, function(track) {
                  track.left.chart.fetch({
                     data: $.param({min:newMin, max:newMax}),
                     error: function(){alert('error fetching');}
                  });
               });               
            } 
            // buffer if getting close to right edge
            else if ( !rover.updatingRight && (rover.get('max')-rover.get('displayMax')) < ( bufferSize*0.20 ) ) {
               rover.updatingRight = true;
               var newMax = rover.get('max')+bufferSize;
               var newMin = newMax - (rover.get('max')-rover.get('min'));
               _.each(rover.tracks.models, function(track) {
                  track.right.chart.fetch({
                     data: $.param({min:newMin, max:newMax}),
                     error: function(){alert('error fetching');}
                  });
               });

            }
            // draw whats in left buffer
            else if( (rover.get('displayMin') - rover.get('min')) < ( bufferSize*0.05 )) {
               rover.tracks.each( function(track) {
                  if (track.parsed)
                     track.center.chart.set({features: track.left.chart.get('features')});
                  else {
                     track.left.chart.drawOnParse = true;
                     track.trigger('fetching');
                  }
               });
               var newMin = Math.max( rover.get('min')-bufferSize, 1);
               var newMax = newMin + (rover.get('max')-rover.get('min'));
               $('#rover-canvas-list').stop();
               rover.set({ 
                  min: newMin,
                  max: newMax
               });
               // rover.set({min:newMin}, {silent:true});
               // rover.set({max:newMax});
            } 
            // draw whats in right buffer
            else if( (rover.get('max')-rover.get('displayMax')) < ( bufferSize*0.05 ) ) {
               rover.tracks.each( function(track) {                  
                  if (track.parsed)
                     track.center.chart.set({features: track.right.chart.get('features')});
                  else {
                     track.right.chart.drawOnParse = true;
                     track.trigger('fetching');
                  }
               });
               var newMax = rover.get('max')+bufferSize;
               $('#rover-canvas-list').stop();
               rover.set({ 
                  max: newMax,
                  min: newMax - (rover.get('max')-rover.get('min'))
               });
            }
         }
      }
   }