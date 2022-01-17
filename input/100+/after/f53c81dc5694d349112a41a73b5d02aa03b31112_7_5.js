function() {

      var usingTransforms = this.usingTransforms;
      var options = this.options;

      this.$allAtoms
        .removeClass( options.hiddenClass + ' ' + options.itemClass )
        .each(function(){
          var style = this.style;
          style.position = '';
          style.top = '';
          style.left = '';
          style.opacity = '';
          if ( usingTransforms ) {
            style[ transformProp ] = '';
          }
        });

      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.isotope')
        .undelegate( '.' + options.hiddenClass, 'click' )
        .removeClass( options.containerClass )
        .removeData('isotope');

      $window.unbind('.isotope');

    }