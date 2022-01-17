function set( t, r, s ) {
      matrix4.set( this.buffer, matrix4.identity );
      transform.fixed( t, r, s, this.buffer );
      this.modified = true;
    }