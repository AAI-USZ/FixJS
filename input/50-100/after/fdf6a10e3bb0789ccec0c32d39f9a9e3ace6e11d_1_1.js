function( sock, data ) {
  if ( sock.readyState !== NODE.SOCKET.STATE.OPEN ) {
    logger.log( LEVEL.ERROR, "[ERROR] Socket is not open, but tried to send: %s", data )
    return this
  }
  const crlf = data.lastIndexOf( DELIM ) === data.length - 2 ? "" : DELIM
  sock.write( data + crlf )
  logger.log( LEVEL.INFO, "[SENT]  %s", data )
  return this
}