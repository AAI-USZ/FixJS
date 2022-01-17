function( msg ) {
  const param   = msg.params[0]
      , target  = param === this.user.nick ? this.user :
                  this.channels.get( objects.id( param ) ) || person( param )
      , modes   = parser.mode( msg.params[1] )
  if ( ! target ) {
    logger.log( LEVEL.WARN, "[WARN]  Got mode %s for %s, dunno what to do", msg.params[1], param )
    return STATUS.ERROR
  }
  if ( this.user === target )
    logger.log( LEVEL.DEBUG, "[DEBUG] Setting mode %s for myself", msg.params[1] )
  else
    logger.log( LEVEL.DEBUG, "[DEBUG] Setting mode %s for %s", msg.params[1], target )
  var marr = modes.get( '+' )
    , i = marr.length, ix
  while ( i-- )
    if ( -1 === target.mode.indexOf( marr[ i ] ) )
      target.mode.push( marr[ i ] )
  marr = modes.get( '-' )
  i = marr.length
  while ( i-- && -1 !== ( ix = target.mode.indexOf( marr[ i ] ) ) )
    target.mode.splice( ix, 1 )
  return STATUS.SUCCESS
}