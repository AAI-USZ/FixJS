function( client, subject ) {
  const isChan = this instanceof Channel
      , from   = isChan ? this : subject
      , user   = isChan ? ( subject instanceof Person
                          ? subject.nick : subject )
                        : this.nick
  client.send( message( COMMAND.KICK, [ from, user ] ) )
  return this
}