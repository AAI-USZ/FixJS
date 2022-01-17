function( c, t ) {
  t || ( t = window );
  var i = -1; while( ++i < this.length ) if ( i in this ) c.call( t, this[i], i, this );
}