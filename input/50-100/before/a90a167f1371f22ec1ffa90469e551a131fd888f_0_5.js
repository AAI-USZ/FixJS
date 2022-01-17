function( c, t ) {
  t || ( t = window );
  var a = [], i = -1; while( ++i < this.length ) c.call( t, this[i], i, this ) && a.push( this[i] );
  return a;
}