function( sock, data ) {
  if ( sock.readyState !== "open" ) {
    logger.log( LEVEL.ERROR, "[ERROR] Socket is not open, but tried to send: %s", data )
    return this
  }
  const crlf = data.lastIndexOf( "\r\n" ) === data.length - 2 ? "" : "\r\n"
  sock.write( data + crlf )
  logger.log( LEVEL.INFO, "[SENT]  %s", data )
  return this
}