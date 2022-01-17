function(position) {
       var rover = this;

       // var canvasWidth = rover.getWidthWithBuffers();   
       // var viewerWidth = $(this.canvasContentDiv).width();
       // var viewerWidthNts = viewerWidth / canvasWidth * (rover.max - rover.min);
       var displayNts = rover.get('displayMax') - rover.get('displayMin');
       var dispMin = Math.max( position - displayNts/2, 1 );
       var dispMax = dispMin + displayNts;
       var bufferSize = rover.getBufferWidth();
      // var allNts = rover.get('max') - rover.get('min');
       var min = Math.max(dispMin - bufferSize, 1);
       var max = dispMax + bufferSize
       rover.set({
          displayMin: dispMin, 
          displayMax: dispMax,
          min: min,
          max: max
       });
       // var scrollLeftNts = position - viewerWidthNts/2;
       // rover.fetchAll( parseInt(min), parseInt(max), 'center');    
       // rover.draw(min, max, canvasWidth, scrollLeftNts);
       // rover.min = min;
       // rover.max = max;
    }