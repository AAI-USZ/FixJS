function( client, note ) {
  client.send( message( COMMAND.NOTICE
           , [ this, trailing( note ) ] ) )
  return this
}