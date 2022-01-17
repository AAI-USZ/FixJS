function( msg ) {
  const chan  = this.channels.get( msg.params[1] )
      , topic = msg.params[2].slice( 1 )
  if ( chan ) {
    logger.log( LEVEL.DEBUG
              , "[DEBUG] Setting topic for %s to %s", chan, topic )
    chan.topic = topic
    return STATUS.SUCCESS
  }
  logger.log( LEVEL.WARN
            , "[WARN]  Got a topic, %s, for channel %s, which I am not in"
            , topic, msg.params[1] )
  return STATUS.ERROR
}