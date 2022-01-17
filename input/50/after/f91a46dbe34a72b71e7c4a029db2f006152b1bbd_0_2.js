function(){
      if( this.hasPrevious() ){
        this.select( this.index - 1 );
      } else {
        this.trigger( OUT_OF_BOUNDS_EVENT, [ this.$element, PREVIOUS_EVENT ] );
      }
      return this;
    }