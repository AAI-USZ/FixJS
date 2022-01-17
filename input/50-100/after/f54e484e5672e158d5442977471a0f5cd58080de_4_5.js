function( type, observer ) {
  const arr = this.get( type )
      , ix  = arr.indexOf( observer )
  if ( -1 === ix )
    return observer
  logger.log( LEVEL.DEBUG, "[DEBUG] Removing observer for %s", type )
  arr.splice( ix, 1 )
  if ( 0 === arr.length )
    this.delete( type )
  return observer
}