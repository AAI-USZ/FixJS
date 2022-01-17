function() {
      var animationEngine = this.options.animationEngine.toLowerCase().replace( /[ _\-]/g, '');
      // set applyStyleFnName
      switch ( animationEngine ) {
        case 'css' :
        case 'none' :
          this.isUsingJQueryAnimation = false;
          break;
        case 'jquery' :
          this.isUsingJQueryAnimation = true;
          break;
        default : // best available
          this.isUsingJQueryAnimation = !Modernizr.csstransitions;
      }
      
      this._updateUsingTransforms();
    }