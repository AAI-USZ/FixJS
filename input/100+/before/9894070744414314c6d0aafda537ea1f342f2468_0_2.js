function( arg1, arg2, arg3 ) {
      var argc = arguments.length;
      if( 1 === argc ) {
        if( arg1 instanceof Transform ||
            arg1 instanceof Matrix4 ) {
          this.buffer = new M4( arg1.buffer );
        } else if( arg1 instanceof M4 ) {
          this.buffer = new M4( arg1 );
        } else {
          this.buffer = transform.fixed( arg1, arg2, arg3 );
        }
      } else {
        this.buffer = transform.fixed( arg1, arg2, arg3 );
      }

      Object.defineProperties( this, {
        "0": {
          get: getView.bind( this, 0 )
        },
        "1": {
          get: getView.bind( this, 1 )
        },
        "2": {
          get: getView.bind( this, 2 )
        },
        "3": {
          get: getView.bind( this, 3 )
        }
      });

      this._views = [];

      updateViews.call( this );

      this.modified = true;
    }