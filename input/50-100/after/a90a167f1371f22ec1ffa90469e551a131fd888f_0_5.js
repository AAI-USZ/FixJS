function( c, t ) {
  t || ( t = window );
  var a = [], v, l = this.length, i = -1; while( ++i < l ) if ( i in this ) c.call( t, v = this[i], i, this ) && a.push( v );
  return a;
}