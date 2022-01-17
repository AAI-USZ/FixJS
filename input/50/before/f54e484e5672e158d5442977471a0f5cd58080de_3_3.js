function( a ) {
  const k = a.id || id( a )
      , v = this[k]
  if ( ! v )
    return null
  delete this[k]
  return v
}