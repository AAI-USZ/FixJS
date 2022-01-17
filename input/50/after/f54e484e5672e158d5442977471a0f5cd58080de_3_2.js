function( o ) {
  const k = o.id || id( o )
  return this.map.set( k, o )
}