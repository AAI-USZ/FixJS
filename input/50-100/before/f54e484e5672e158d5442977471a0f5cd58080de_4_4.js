function( type, ix ) {
  const arr = this[type]
  logger.log( LEVEL.DEBUG, "[DEBUG] Removing observer for %s", type )
  arr.splice( ix, 1 )
  if ( 0 === arr.length )
    delete this[type]
}