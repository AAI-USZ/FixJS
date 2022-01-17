function( irc, callback ) {
  if ( arguments.length === 2 )
    irc.observe( ERROR.NOSUCHSERVER, REPLY.VERSION, function( msg ) {
      // @todo wat
    } )
  irc.send( message( COMMAND.VERSION, [ this.name ] ) )
  return this
}