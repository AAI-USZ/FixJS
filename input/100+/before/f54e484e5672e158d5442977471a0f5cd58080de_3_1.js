function( irc, chan, pass, callback ) {
  const args = Array.apply( null, arguments )
      , cbck = args.pop()
  var ch = this.get( chan )
  if ( ch ) {
    if ( cbck instanceof Function )
      cbck( ch )
    return ch
  } else if ( chan instanceof Channel
      && chan.people.contains( irc.user ) ) {
    // This means we just joined, so now we can add it to the map for all to see
    this[ chan.id ] = chan
    return chan
  }
  args.splice( 0, 2 )
  args.push( cbck )
  ch = chan instanceof Channel ? chan : channel( chan )
  return ch.for( irc ).join.apply( ch, args )
}