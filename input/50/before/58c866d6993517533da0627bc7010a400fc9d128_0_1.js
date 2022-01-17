function() {
      if( this._cachedPosition.modified ) {
        // Update local position
        this._cachedPosition.modified = false;
      }
      return this._position;
    }