function( c, t ) {
  t || ( t = window );
  var i = -1; while( ++i < this.length ) if ( c.call( t, this[i], i, this ) === false ) return false;
  return true;
}