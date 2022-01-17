function( client, text ) {
  const sender  = this.params[0]
      , recip   = sender === client.user.nick
                ? this.from.nick : sender
  client.send( message( COMMAND.PRIVMSG
           , [ recip, trailing( text ) ] ) )
  return this
}