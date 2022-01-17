function( chan, pass, callback ) {
  const args = []
  args.push.apply( args, arguments )
  const cbck = args.pop()
  var ch = this.channels.get( chan.id || objects.id( chan ) )
  if ( ch ) {
    if ( cbck instanceof Function )
      cbck( ch )
    return this
  } else if ( chan instanceof Channel
      && chan.people.has( this.user.id ) ) {
    // This means we just joined, so now we can add it to the map for all to see
    this.channels.set( chan.id, chan )
    return chan
  }
  args.shift()
  args.push( cbck )
  ch = chan instanceof Channel ? chan : channel( chan )
  return ch.for( this ).join.apply( ch, args )
}