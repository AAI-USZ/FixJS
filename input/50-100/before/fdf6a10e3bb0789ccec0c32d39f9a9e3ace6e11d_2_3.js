function( irc, subject ) {
  const isChan = this instanceof Channel
      , chan   = isChan ? this : subject
      , user   = isChan ? ( subject instanceof Person
                          ? subject.nick : subject )
                        : this.nick
  irc.send( message( COMMAND.INVITE, [ user, chan ] ) )
  return this
}