function( msg ) {
  const from  = msg.params[1]
      , to    = msg.params[2]
  if ( this.channels.has( objects.id( to ) ) ) {
    logger.log( LEVEL.DEBUG, "[DEBUG] Forwarded from %s to %s, which already existed", from, to )
    return
  }
  const chan = channel( to )
  chan.people.set( this.user.id, this.user )
  this.channels.delete( objects.id( from ) )
  this.channels.set( chan.id, chan )
  logger.log( LEVEL.INFO, "[INFO]  Got forwarded from %s to %s, adding %s", from, to, to )

  return STATUS.ERROR
}