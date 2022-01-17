function( internal ) {
  const since = internal.connectedSince
  internal.queue.splice( 0 )
  internal.socket.end()
  internal.connected = false
  internal.connectedSince = null
  internal.socket = null
  this.observers.notify( EVENT.DISCONNECT )
  if ( since )
    logger.log( LEVEL.INFO
              , "[INFO]  Connected at %s, disconnected at %s"
              , since, new Date() )
  return this
}