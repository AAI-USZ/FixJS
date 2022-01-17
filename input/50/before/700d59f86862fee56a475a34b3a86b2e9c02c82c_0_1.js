function(){
      if( this.hasNext() ){
        this.select( this.index + 1 );
      } else {
        this.trigger( OUT_OF_BOUNDS_EVENT, [ this.$element, 'next' ] );
      }
      return this;
    }