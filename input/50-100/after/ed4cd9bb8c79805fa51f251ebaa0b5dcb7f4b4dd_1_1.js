function() {
           var sl = (rover.get('displayMin') - rover.get('min')) * ( rover.getDisplayWidth() / rover.getDisplayWidthNts() );
           sl = Math.round(sl*100) / 100;
           this.$('#rover-canvas-list')[0].scrollLeft = sl;           
        }