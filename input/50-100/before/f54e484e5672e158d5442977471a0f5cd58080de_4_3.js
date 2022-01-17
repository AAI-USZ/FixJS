function( type, observer ) {
  const key = type.toLowerCase()
      , arr = this[type] || ( this[type] = [] )
  arr.push( observer )
  logger.log( LEVEL.DEBUG, "[DEBUG] Adding observer for %s", type )
  return observer
}