function set( t, r, s ) {
      transform.compound( t, r, s, this.buffer );
      this.modified = true;
    }