function( irc, mode ) {
  irc.send( message( COMMAND.MODE
          , [ this, mode ] ) )
}