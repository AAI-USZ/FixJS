function( msg ) {
  // Remove from all chans
  const user = msg.from.nick
  // TODO TODO TODO, actually remove user once Map API gets less broken.
  logger.log( LEVEL.DEBUG, "[DEBUG] Got a quit message for %s, removing them from all channels", user )
  return STATUS.SUCCESS
}