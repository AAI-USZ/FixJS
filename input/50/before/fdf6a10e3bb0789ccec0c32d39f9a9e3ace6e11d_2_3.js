function( irc, text ) {
  irc.send( message( COMMAND.PRIVMSG, [ this, trailing( text ) ] ) )
  return this
}