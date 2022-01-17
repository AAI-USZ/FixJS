function( irc, channel, words ) {
  const chan = this.get( channel )
  if ( null === chan )
    return null
  // This means that we have not left the channel yet
  if ( chan.people.contains( irc.user ) )
    return chan.part( words )
  // Now we should be outta there, and can remove it from the map
  delete this[ chan.id ]
  return chan
}