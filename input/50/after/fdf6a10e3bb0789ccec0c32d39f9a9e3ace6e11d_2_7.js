function( client, txt ) {
  // Someone tried to part a channel we're not in, what do?
  if ( ! client.channels.has( this.id ) )
    return
  client.part( this.name, txt )
  return this
}