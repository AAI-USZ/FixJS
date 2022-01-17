function( internal, callback ) {
  // Pick an appropriate connection method
  const connect =
    this.config.server.ssl ? tls.connect : net.connect

  if ( internal.connected ) {
    logger.log( LEVEL.WARN, "[WARN]  Already connected at %s", internal.connectedSince )
    return this
  }

  internal.socket = connect( this.server.port, this.server.name )
  internal.socket.setEncoding( this.config.encoding )
  internal.socket.setTimeout( 0 )

  internal.socket.addListener( SOCKET.CONNECT, onConnect.bind( this, internal ) )
  internal.socket.addListener( SOCKET.DATA, onData.bind( this, internal ) )
  internal.socket.addListener( SOCKET.TIMEOUT, this.disconnect )

  // Add all default observers
  observers.register( this )

  if ( 2 === arguments.length ) // Do all servers send a 001 ?
    this.observe( REPLY.WELCOME, function() {
      return callback( this ), STATUS.REMOVE }.bind( this ) )

  // Forward network errors
  internal.socket.addListener( SOCKET.ERROR
    , this.observers.notify.bind( this.observers, EVENT.ERROR ) )

  return this
}