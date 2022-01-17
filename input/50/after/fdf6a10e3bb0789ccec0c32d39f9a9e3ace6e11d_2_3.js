function( client, text ) {
  client.send( message( COMMAND.PRIVMSG, [ this, trailing( text ) ] ) )
  return this
}