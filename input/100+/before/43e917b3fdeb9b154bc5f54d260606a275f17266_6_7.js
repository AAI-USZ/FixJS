function( msg ) {
  const from  = msg.params[1]
      , to    = msg.params[2]
  if ( this.channels.contains( to ) ) {
    logger.log( LEVEL.DEBUG, "[DEBUG] Forwarded from %s to %s, which already existed", from, to )
    return
  }
  const chan = channel( to )
  chan.people.add( this.user )
  this.channels.add( chan.for( this ) )
  this.channels.add( to )
  logger.log( LEVEL.INFO, "[INFO]  Got forwarded from %s to %s, adding %s", from, to, to )

  return STATUS.ERROR
}