function(model,changes,options) {
           // check if this view is being scrolled by the user
           // if so, do nothing
           if (options.uid != this.el.dataset.uid) {
              var sl = (rover.get('displayMin') - rover.get('min')) * ( rover.getDisplayWidth() / rover.getDisplayWidthNts() );
              sl = Math.round(sl*100) / 100;
              this.$('#rover-canvas-list')[0].scrollLeft = sl;
           }
        }