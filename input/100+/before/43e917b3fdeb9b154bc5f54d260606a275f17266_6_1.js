function( msg ) {
  /** @todo {jonas} Do some clients use a trailing param for channel name?
      Saw some of those in the fixtures. */
  const name = msg.params[0]
      , nick = msg.from.nick
      , self = nick === this.user.nick
  var chan = null
  if ( self ) {
    chan = channel( name )
    chan.people.add( this.user )
    this.channels.add( chan.for( this ) )
    logger.log( LEVEL.INFO, "[INFO]  Successfully joined %s", name )
    return STATUS.SUCCESS
  }
  const prsn = person( nick, msg.from.user, msg.from.host ).for( this )
  logger.log( LEVEL.INFO, "[INFO]  Adding %s to %s", prsn, name )
  this.channels.get( name ).people.add( prsn )
  return STATUS.SUCCESS
}