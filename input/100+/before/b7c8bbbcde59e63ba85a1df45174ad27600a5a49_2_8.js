function() {
      this.el.scrollLeft = (rover.get('displayMin') - rover.get('min')) * ( rover.getDisplayWidth() / rover.getDisplayWidthNts() );
   }