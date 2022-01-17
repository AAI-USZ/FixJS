function( msg ) {
  // Remove from all chans
  const user = msg.from.nick
  var chan
  for ( chan in this.channels )
    if ( this.channels[chan].people ) // Gross, all sorts of other stuff in this obj...
      this.channels[chan].people.remove( user )
  logger.log( LEVEL.DEBUG, "[DEBUG] Got a quit message for %s, removing them from all channels", user )
  return STATUS.SUCCESS
}