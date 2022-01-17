function( c, t ) {
  t || ( t = window );
  var a = [], i = -1; while( ++i < this.length ) a [i] = c.call( t, this[i], i, this );
  return a;
}