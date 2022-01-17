function( irc, text ) {
  const sender  = this.params[0]
      , recip   = sender === irc.user.nick
                ? this.from.nick : sender
  irc.send( message( COMMAND.PRIVMSG
                  , [ recip, trailing( text ) ] ) )
  return this
}