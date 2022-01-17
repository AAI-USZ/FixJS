function( irc, note ) {
  irc.send( message( COMMAND.NOTICE
          , [ this, trailing( note ) ] ) )
  return this
}