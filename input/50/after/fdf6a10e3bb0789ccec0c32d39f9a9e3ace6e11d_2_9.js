function( client, mode ) {
  client.send( message( COMMAND.MODE
           , [ this, mode ] ) )
}