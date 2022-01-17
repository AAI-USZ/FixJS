function( msg ) {
  // Not sure if anyone makes use of it, but KICK commands may use two comma-
  // separated lists of equal length; one of channels and one of users.
  const chans = msg.params[0].split( "," )
      , users = parser.nick( msg.params[1], true )
  var i = 0, j = 0
    , k = users.length
    , l = chans.length
    , chan = null
  while ( l-- ) {
    if ( chan = this.channels.get( objects.id( chans[l] ) ) )
      for ( i = 0; i < k; ++i )
        if ( users[i] === this.user.nick ) {
          // They hate the bot and want it gone.
          chan.people.delete( objects.id( users[i] ) )
          logger.log( LEVEL.DEBUG, "[DEBUG] I was kicked from %s, removing it", chan.name )
          this.channels.delete( chan.id )
        } else {
          logger.log( LEVEL.DEBUG, "[DEBUG] %s was kicked from %s, removing them", users[i], chan.name )
          chan.people.delete( objects.id( users[i] ) )
        }
  }
  return STATUS.SUCCESS
}