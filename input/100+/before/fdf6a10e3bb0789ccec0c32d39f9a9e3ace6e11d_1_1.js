function( internal, data ) {
  var buffer
    , last
    , message
    , i, l

  // Apply previous buffer, split, re-buffer
  if ( 0 !== internal.buffer.length ) {
    internal.buffer.push( data )
    data = internal.buffer.splice( 0 ).join( "" )
  }

  buffer = data.split( "\r\n" )

  if ( last = buffer.pop() )
    internal.buffer.push( last )

  // Emit!
  for ( i = 0, l = buffer.length; i < l; ++i ) {
    logger.log( LEVEL.INFO, "[RECV]  %s", buffer[i] )

    message = parser.message( buffer[i] + "\r\n", this.config.die )

    if ( null === message ) {
      logger.log( LEVEL.ERROR, "[ERROR] Failed parsing %s", buffer[i] )
      continue
    }
    // Give superpowers
    message.for( this )

    this.observers.notify( message.type, message )
    this.observers.notify( EVENT.ANY, message )
  }
}