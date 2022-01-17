function( msg ) {
  const chan  = this.channels.get( objects.id( msg.params[2] ) )
      , nicks = parser.nick( msg.params[3], this.config.die )
      , count = nicks.length
  if ( ! chan ) {
    logger.log( LEVEL.ERROR, "[ERROR] Got a name reply for unknown channel %s", msg.params[2] )
    return STATUS.ERROR
  }
  var i = 0, p = null, prsn = null
  for ( ; i < count; ++i ) {
    prsn = person( nicks[i] )
    chan.people.set( prsn.id, prsn ) // @todo Go ask for user info
    logger.log( LEVEL.DEBUG, "[DEBUG] Adding %s to %s", prsn.nick, chan )
  }
  return STATUS.SUCCESS
}