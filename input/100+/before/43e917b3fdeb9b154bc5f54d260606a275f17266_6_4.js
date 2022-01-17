function( msg ) {
  const name = msg.params[0]
      , nick = msg.from.nick
      , chan = this.channels.get( name )

  if ( chan && chan.people.contains( nick ) ) {
    chan.people.remove( nick )
    logger.log( LEVEL.DEBUG, "[DEBUG] Removing %s from %s", nick, chan )

    if ( nick === this.user.nick ) {
      logger.log( LEVEL.DEBUG, "[DEBUG] Left %s, removing it", chan )
      this.channels.remove( name )
    }

    return STATUS.SUCCESS
  }

  if ( chan ) {
    logger.log( LEVEL.ERROR
              , "[ERROR] Got a part message from %s for channel %s, but %s was not in that channel"
              , nick, name, nick )
    return STATUS.ERROR
  }

  logger.log( LEVEL.ERROR
            , "[ERROR] Got a part message from %s for channel %s, which I am not in"
            , nick, name )
  return STATUS.ERROR
}