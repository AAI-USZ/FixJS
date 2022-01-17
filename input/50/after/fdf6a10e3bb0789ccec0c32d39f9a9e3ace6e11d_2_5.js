function( client, topic, callback ) {
  client.send( message( COMMAND.TOPIC, [ this, trailing( topic ) ] ) )
  return this
}