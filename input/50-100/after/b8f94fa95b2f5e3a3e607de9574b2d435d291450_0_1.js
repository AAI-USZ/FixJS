function() {
      var columns = this._labelToColumnMap;
      var result = 0;
      for( var key in columns ) {
        if( columns[ key ].getVisibility() ) {
          var left = columns[ key ].getLeft() + columns[ key ].getWidth();
          result = Math.max( result, left );
        }
      }
      return result;
    }