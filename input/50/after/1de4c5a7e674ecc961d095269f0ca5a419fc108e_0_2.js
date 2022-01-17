function ( value, trigger, refresh ) {
      this._clearInteractiveTimeout( );

      value = Math.max( value, 0 );
      this._setInteractiveCenterAndSize( this._center, value );

      this._setInteractiveTimeout( trigger );
    }