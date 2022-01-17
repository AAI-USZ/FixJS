function() {
      if( this._position.modified ) {
        // Update local position
        this._position.modified = false;
      }
      return this._position;
    }