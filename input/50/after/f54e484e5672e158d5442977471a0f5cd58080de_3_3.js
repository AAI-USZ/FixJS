function( a ) {
  const k = a.id || id( a )
      , v = this.map.get( k )
  if ( ! v )
    return null
  this.map.delete( k )
  return v
}