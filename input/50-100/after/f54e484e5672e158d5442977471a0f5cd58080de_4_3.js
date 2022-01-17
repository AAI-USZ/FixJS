function( type, observer ) {
   // TODO switch to a Set and get tid of all the index crap, once Set is more usable.
  const key = type.toLowerCase()
      , arr = this.get( type ) || ( this.set( type, [] ) )
  arr.push( observer )
  logger.log( LEVEL.DEBUG, "[DEBUG] Adding observer for %s", type )
  return observer
}