function( msg ) {
  const chan  = this.channels.get( msg.params[0] )
      , topic = msg.params[1].slice( 1 )
  if ( chan ) {
    if ( chan.topic )
      logger.log( LEVEL.DEBUG
                , "[DEBUG] Updating topic for %s from %s to %s", chan, chan.topic, topic )
    else
      logger.log( LEVEL.DEBUG
                , "[DEBUG] Setting topic for %s to %s", chan, topic )
    chan.topic = topic
    return STATUS.SUCCESS
  }
  logger.log( LEVEL.WARN, "[WARN]  Got a topic (%s) for channel %s, which I am not in"
            , topic, msg.params[0] )

  return STATUS.ERROR
}