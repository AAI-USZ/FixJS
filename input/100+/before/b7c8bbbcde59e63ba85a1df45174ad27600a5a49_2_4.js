function(position) {
       var rover = this;

       var canvasWidth = rover.getWidthWithBuffers();   
       var viewerWidth = $(this.canvasContentDiv).width();
       var viewerWidthNts = viewerWidth / canvasWidth * (rover.max - rover.min);
       var min = Math.max( position - (rover.max-rover.min)/2, 1 );
       var max = min + (rover.max - rover.min);
       var scrollLeftNts = position - viewerWidthNts/2;
       rover.fetchAll( parseInt(min), parseInt(max), 'center');    
       rover.draw(min, max, canvasWidth, scrollLeftNts);
       rover.min = min;
       rover.max = max;
    }