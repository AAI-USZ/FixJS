function() {

      var usingTransforms = this.usingTransforms;

      this.$allAtoms
        .removeClass( this.options.hiddenClass + ' ' + this.options.itemClass )
        .each(function(){
          this.style.position = '';
          this.style.top = '';
          this.style.left = '';
          this.style.opacity = '';
          if ( usingTransforms ) {
            this.style[ transformProp ] = '';
          }
        });
      
      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var i=0, len = isoContainerStyles.length; i < len; i++ ) {
        var prop = isoContainerStyles[i];
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }
      
      this.element
        .unbind('.isotope')
        .undelegate( '.' + this.options.hiddenClass, 'click' )
        .removeClass( this.options.containerClass )
        .removeData('isotope');
      
      $(window).unbind('.isotope');

    }