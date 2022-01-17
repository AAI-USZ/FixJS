function( c, v ) {
  var i = this.length; if ( v === undefined ) v = this[--i];
  while( --i >= 0 ) if ( i in this ) v = c( v, this[i], i, this );
  return v;
}