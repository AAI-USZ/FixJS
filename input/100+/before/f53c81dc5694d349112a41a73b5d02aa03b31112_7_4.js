function( $content ) {
      // remove elements from Isotope instance in callback
      var instance = this;
      var removeContent = function() {
        instance.$allAtoms = instance.$allAtoms.not( $content );
        $content.remove();
      };

      if ( $content.filter( ':not(.' + this.options.hiddenClass + ')' ).length ) {
        // if any non-hidden content needs to be removed
        this.styleQueue.push({ $el: $content, style: this.options.hiddenStyle });
        this.$filteredAtoms = this.$filteredAtoms.not( $content );
        this._sort();
        this.reLayout( removeContent );
      } else {
        // remove it now
        removeContent();
      }

    }