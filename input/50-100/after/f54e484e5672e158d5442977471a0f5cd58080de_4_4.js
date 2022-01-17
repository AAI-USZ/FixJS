function( type, ix ) {
  const arr = this.get( type )
  logger.log( LEVEL.DEBUG, "[DEBUG] Removing observer for %s", type )
  arr.splice( ix, 1 )
  if ( 0 === arr.length )
    this.delete( type )
}