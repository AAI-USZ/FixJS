function( irc, topic, callback ) {
  irc.send( message( COMMAND.TOPIC, [ this, trailing( topic ) ] ) )
  return this
}