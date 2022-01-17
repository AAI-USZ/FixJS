function( client, callback ) {
  if ( arguments.length === 2 )
    client.observe( ERROR.NOSUCHSERVER, REPLY.VERSION, function( msg ) {
      // @todo wat
    } )
  client.send( message( COMMAND.VERSION, [ this.name ] ) )
  return this
}