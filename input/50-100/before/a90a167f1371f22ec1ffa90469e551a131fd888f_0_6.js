function( c, v ) {
  var i = -1; if ( v === undefined ) v = this[++i];
  while( ++i < this.length ) v = c( v, this[i], i, this );
  return v;
}