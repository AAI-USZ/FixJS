function( msg ) {
  const chan  = this.channels.get( msg.params[2] )
      , nicks = parser.nick( msg.params[3], this.config.die )
      , count = nicks.length
  if ( ! chan ) {
    logger.log( LEVEL.ERROR, "[ERROR] Got a name reply for unknown channel %s", msg.params[2] )
    return STATUS.ERROR
  }
  var i = 0, p = null, nick = null
  for ( ; i < count; ++i ) {
    nick = nicks[i]
    chan.people.add( nick ) // @todo Go ask for user info
    logger.log( LEVEL.DEBUG, "[DEBUG] Adding %s to %s", nick, chan )
  }
  return STATUS.SUCCESS
}