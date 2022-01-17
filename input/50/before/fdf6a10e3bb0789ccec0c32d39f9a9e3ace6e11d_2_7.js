function( irc, txt ) {
  // Someone tried to part a channel we're not in, what do?
  if ( ! irc.channels.has( this.id ) )
    return
  irc.part( this.name, txt )
  return this
}