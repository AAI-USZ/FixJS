function( type, observer ) {
  const arr = this[type]
      , ix  = arr.indexOf( observer )
  if ( -1 === ix )
    return observer
  logger.log( LEVEL.DEBUG, "[DEBUG] Removing observer for %s", type )
  arr.splice( ix, 1 )
  if ( 0 === arr.length )
    delete this[type]
  return observer
}